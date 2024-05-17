import {Category} from "./category"

export class Product {
  name: String = ""
  description: String = ""
  // more_description: String = ""
  stock: Number = 0
  solde_price: Number = 0
  regular_price = 0
  categories: Array<Category> = []
  brand: String = ""
  imageUrls: Array<String> = []
  currency: String = "EUR"
  status: Boolean = false
  availability: Boolean = false
  //taille
  options: Object = {}
  isBestSeller: Boolean = false
  isNewArrival: Boolean = false
  isSpecialOffer: Boolean = false
  updated_at: Date|null = null
  created_at: Date|null = null

}
