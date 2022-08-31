const { readFileSync, writeFileSync } = require('fs')
const { compile } = require('handlebars')
const { dirname, resolve } = require('path')
const mkdirp = require('mkdirp')

const TEMPLATE_FOLDER = resolve(__dirname, '..', 'templates')

const ENCODING = 'utf8'
const modelTemplatePath = `${TEMPLATE_FOLDER}/model.template.hbs`
const modelExtendTemplatePath = `${TEMPLATE_FOLDER}/model-extend.template.hbs`

module.exports.generateModelFiles = async (service, components) => {
    if (!service.config.model || !service.config.modelDir) {
        return
    }

    const modelClassContent = getDefinitionItems(components.schemas)
        .map(({ className, properties }) =>
            generateModelContent(className, properties)
        )
        .join('\n')

    const modelImportContent = getImportContent()

    const modelFileContent = [modelImportContent, modelClassContent].join('\n')

    await writeModelFile(service, modelFileContent)
}

function getImportContent() {
    return [
        "import { Type } from 'class-transformer'",
        "import { Model } from '@/http/core'",
        '\r\n'
    ].join('\r\n')
}

function getDefinitionItems(definitions) {
    return Object.entries(definitions)
        .map(([className, { type, properties }]) => ({
            className,
            type,
            properties
        }))
        .filter(
            ({ className, type }) =>
                !className.startsWith('Map') &&
                !className.startsWith('Page') &&
                !className.startsWith('Pageable') &&
                !className.startsWith('Serializable') &&
                !className.startsWith('Predicate') &&
                !className.startsWith('Sort') &&
                type == 'object'
        )
}

function generateModelContent(className, properties) {
    const templateSource = readFileSync(modelTemplatePath, ENCODING)
    const template = compile(templateSource)

    return template({
        className: className,
        properties: getformatProperty(properties)
    })
}

function getformatProperty(properties) {
    return Object.entries(properties).map(([propertyName, propertyConfig]) => {
        return {
            propertyName,
            propertyType: getPropertyType(propertyConfig),
            originalRef: getOriginalRef(propertyConfig),
            description: propertyConfig.description
        }
    })
}

function getOriginalRef(propertyConfig) {
    if (
        propertyConfig.type === 'string' &&
        propertyConfig.format === 'date-time'
    ) {
        return 'Date'
    }

    return (propertyConfig?.$ref || propertyConfig?.items?.$ref)?.replace(
        '#/components/schemas/',
        ''
    )
}

function getPropertyType(config) {
    const ref = config.$ref || config['allOf']?.[0]?.$ref

    switch (true) {
        case !!ref:
            return ref.replace('#/components/schemas/', '')
        case config.type === 'integer':
            return 'number'
        case config.type === 'string' && config.format === 'date-time':
            return 'Date'
        case config.type === 'array':
            return `${getPropertyType(config.items)}[]`
    }
    return config.type
}

/**
 * 生成控制器文件
 * @param service
 * @param param1
 * @param content
 */
async function writeModelFile(service, content) {
    const modelDirectionPath = service.config.modelDir

    const name = service.key ? `${service.key}.model.ts` : 'index.ts'
    const path = resolve(modelDirectionPath, name)

    await mkdirp.sync(dirname(path))
    await writeFileSync(path, content.replace(/\r\n/g, '\n'), ENCODING)
}
