const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 70,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]
/* EXERCISE 4.6 */
const result1 = blogs.reduce(
  (acc, item) => ((acc[item.author] = (acc[item.author] || 0) + 1), acc),
  {}
)

const result = Object.entries(result1).reduce((a, b) => {
  return a[1] > b[1] ? a : b
})

/* EXERCISE 4.7 */
const groupBy = (array, groups, valueKey) => {
  const map = new Map()
  groups = [].concat(groups)
  return array.reduce((acc, item) => {
    groups.reduce((mapAcc, currKey, index, { length }) => {
      let child
      if (mapAcc.has(item[currKey])) return mapAcc.get(item[currKey])
      if (index + 1 === length) {
        child = Object.assign(...groups.map(k => ({ [k]: item[k] })), {
          [valueKey]: 0,
        })
        acc.push(child)
      } else {
        child = new Map()
      }
      mapAcc.set(item[currKey], child)
      return child
    }, map)[valueKey] += +item[valueKey]
    return acc
  }, [])
}

var data = [
  { Phase: 'Phase 1', Step: 'Step 1', Task: 'Task 1', Value: '5' },
  { Phase: 'Phase 1', Step: 'Step 1', Task: 'Task 2', Value: '10' },
  { Phase: 'Phase 1', Step: 'Step 2', Task: 'Task 1', Value: '15' },
  { Phase: 'Phase 1', Step: 'Step 2', Task: 'Task 2', Value: '20' },
  { Phase: 'Phase 2', Step: 'Step 1', Task: 'Task 1', Value: '25' },
  { Phase: 'Phase 2', Step: 'Step 1', Task: 'Task 2', Value: '30' },
  { Phase: 'Phase 2', Step: 'Step 2', Task: 'Task 1', Value: '35' },
  { Phase: 'Phase 2', Step: 'Step 2', Task: 'Task 2', Value: '40' },
]

//console.log(groupBy(blogs, 'author', 'likes'))
//groupBy(blogs, 'author', 'likes')
const grouped = groupBy(blogs, 'author', 'likes')
console.log('grouped', grouped)

//
const reduced = grouped.reduce((acc, item) => {
  return acc.likes > item.likes ? acc : item
}, 0)
console.log('reduced', reduced)
