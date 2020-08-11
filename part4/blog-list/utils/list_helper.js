const dummy = blogs => {
  return (blogs.length + 1) / (blogs.length + 1)
}

const totalLikes = blogs => {
  const reduced = blogs.reduce((acc, item) => {
    return acc + item.likes
  }, 0)
  return reduced
}

const mostLikes = blogs => {
  const reduced = blogs.reduce((acc, item) => {
    return acc.likes > item.likes ? acc : item
  }, 0)
  return reduced
}

const mostBlogsAuthor = blogs => {
  const reduced = blogs.reduce((acc, item) => {

    if (acc.author === item.author) {
            return acc
    } else {
      return item
    }
    
  }, 0)

  return reduced
}

const mostBlogsAuthorDetails = blogs => {
const result1 = blogs.reduce(
  (acc, item) => ((acc[item.author] = (acc[item.author] || 0) + 1), acc),
  {}
)
const result = Object.entries(result1).reduce((a, b) => {
  return a[1] > b[1] ? a : b
})
return result
}


const mostLikesAuthor = blogs => {
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

const grouped = groupBy(blogs, 'author', 'likes')

const result = grouped.reduce((acc, item) => {
  return acc.likes > item.likes ? acc : item
}, 0)
return result

}



module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogsAuthor,
  mostBlogsAuthorDetails,
  mostLikesAuthor
}
