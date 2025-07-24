const { test } = require('node:test')
const assert = require('node:assert')

const emptyArray = require('./utils/list_helper.js').emptyArray
const dummy = require('./utils/list_helper.js').dummy

const testArray = [1,2,3]

test('is array empty?', () => {
  const result = emptyArray(testArray)

  assert.strictEqual(result, false)
})

test('exepted return = 1'), () => {
  blogs = []

  const result = dummy(blogs)

  assert.strictEqual(result, 1)
}