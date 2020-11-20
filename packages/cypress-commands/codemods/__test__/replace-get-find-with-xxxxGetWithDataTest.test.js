import assertDirEqual from 'assert-dir-equal'
import fs from 'fs-extra'
import path from 'path'
import spawn from 'cross-spawn'

/**
 * This test will not work in watch mode.
 * I already tried to add the `actual` folder to the ignored module paths
 * in the jest condig, but it didn't work
 */
describe('Transform vanilla cypress commands to custom dhis2 commands', () => {
    const PATH_ALL = path.join(
        __dirname,
        'replace-get-find-with-xxxxGetWithDataTest'
    )
    const PATH_SOURCE = path.join(PATH_ALL, 'get-find-source')
    const PATH_ACTUAL = path.join(PATH_ALL, 'get-find-actual')
    const PATH_EXPECTED = path.join(PATH_ALL, 'get-find-expected')
    const FILE_CODEMOD = path.join(
        __dirname,
        '..',
        'replace-get-find-with-xxxxGetWithDataTest.js'
    )

    beforeEach(() => {
        // make sure the generated file is not there
        fs.removeSync(PATH_ACTUAL)

        // add files the test should work on
        fs.copySync(PATH_SOURCE, PATH_ACTUAL)
    })

    afterAll(() => {
        // clean up
        fs.removeSync(PATH_ACTUAL)
    })

    it('should transform all "get"/"find" that contain the custom data test selector syntax', () => {
        // perform the codemod on the "actual" file
        spawn.sync('jscodeshift', ['-t', FILE_CODEMOD, PATH_ACTUAL])
        assertDirEqual(PATH_ACTUAL, PATH_EXPECTED)
    })
})
