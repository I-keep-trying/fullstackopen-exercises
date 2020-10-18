const exampleSquareRootFunction = async input => {
    if (isNaN(input)) {
      throw new Error('Only numbers are accepted')
    }
  
    if (input < 0) {
      return { success: false, message: 'Cannot square root negative number' }
    } else {
      return { success: true, value: Math.sqrt(input) }
    }
  }
  
  const checkSquareRoot = async value => {
    const response = await exampleSquareRootFunction(value)
    return response
  }
  
  console.log(checkSquareRoot(25))