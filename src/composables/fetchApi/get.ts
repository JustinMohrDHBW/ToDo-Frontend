export async function getCategories() {
  try {
    const response = await fetch('/kategory.json')
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`)
    }
    console.log(response)
    return await response.json()
  } catch (error) {
    console.error('Error loading categories:', error)
    throw error
  }
}