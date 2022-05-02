import useHttpClient from '@/utils/client'
import { ENDPOINTS } from '@/utils/endpoints'

const getCategories = async (url: any) => {
  const httpClient = useHttpClient()
  console.log('get categorieeeees')
  try {
    const { data } = await httpClient.get(`${url}`)
    return data
  } catch (err) {
    console.error('Error at getCategories: ', err)
    throw err
  }
}

const getCategory = async (categoryId: number) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.get(
      `${ENDPOINTS.categories}/${categoryId}/`
    )
    return data
  } catch (err) {
    console.error('Error at getCategory: ', err)
    throw err
  }
}

const saveCategory = async (categoryData: any) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.post(
      `${ENDPOINTS.categories}`,
      categoryData
    )
    return data
  } catch (err) {
    console.error('Error at saveCategory: ', err)
    throw err
  }
}

const updateCategory = async (categoryId: number, categoryData: any) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.put(
      `${ENDPOINTS.categories}/${categoryId}`
    )
    return data
  } catch (err) {
    console.error('Error at updateCategory: ', err)
    throw err
  }
}

const deleteCategory = async (categoryId: number) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.delete(
      `${ENDPOINTS.categories}/${categoryId}`
    )
    return data
  } catch (err) {
    console.error('Error at deleteCategory: ', err)
    throw err
  }
}

export {
  getCategories,
  getCategory,
  saveCategory,
  updateCategory,
  deleteCategory,
}
