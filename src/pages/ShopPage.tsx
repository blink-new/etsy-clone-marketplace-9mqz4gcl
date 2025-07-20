import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Filter, Grid, List, Star, Heart } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Checkbox } from '../components/ui/checkbox'
import { Slider } from '../components/ui/slider'
import { useCart } from '../hooks/useCart'
import { toast } from 'sonner'
import { productService, type Product } from '../services/database'

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])
  const { addToCart } = useCart()

  const searchQuery = searchParams.get('search') || ''
  const categoryFilter = searchParams.get('category') || ''

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Load products from database
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        let loadedProducts: Product[]

        if (searchQuery) {
          loadedProducts = await productService.search(searchQuery)
        } else if (categoryFilter) {
          loadedProducts = await productService.getByCategory(categoryFilter)
        } else {
          loadedProducts = await productService.getAll()
        }

        setProducts(loadedProducts)
        setFilteredProducts(loadedProducts)
      } catch (error) {
        console.error('Error loading products:', error)
        toast.error('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [searchQuery, categoryFilter])

  // Apply price filter
  useEffect(() => {
    const filtered = products.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    setFilteredProducts(filtered)
  }, [products, priceRange])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image || '',
      seller: product.sellerName || 'Unknown Seller'
    })
    toast.success('Added to cart!')
  }

  const categories = [
    'Jewelry & Accessories',
    'Clothing & Shoes',
    'Home & Living',
    'Wedding & Party',
    'Toys & Entertainment',
    'Art & Collectibles',
    'Craft Supplies',
    'Vintage'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Search results for "${searchQuery}"` : 
                 categoryFilter ? categoryFilter : 'All items'}
              </h1>
              <p className="text-gray-600 mt-1">
                {loading ? 'Loading...' : `${filteredProducts.length} results`}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Select defaultValue="relevancy">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancy">Relevancy</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Customer Reviews</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden mb-4"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <label htmlFor={category} className="text-sm text-gray-700 cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={5}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Special Offers */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Special offers</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="free-shipping" />
                    <label htmlFor="free-shipping" className="text-sm text-gray-700 cursor-pointer">
                      Free shipping
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="on-sale" />
                    <label htmlFor="on-sale" className="text-sm text-gray-700 cursor-pointer">
                      On sale
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/shop'}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <Card key={product.id} className={`group overflow-hidden hover:shadow-lg transition-shadow ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
                    }`}>
                      <img
                        src={product.image || '/placeholder-image.jpg'}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      {product.price >= 35 && (
                        <Badge className="absolute top-2 left-2 bg-[#00A693] text-white">
                          FREE shipping
                        </Badge>
                      )}
                    </div>
                    
                    <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-medium text-gray-900 mb-2 hover:text-[#F16521] transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{product.rating || 0}</span>
                        <span className="text-sm text-gray-500">({product.reviewCount || 0})</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{product.sellerName}</p>
                      
                      {product.price >= 35 && (
                        <p className="text-sm text-[#00A693] font-medium mb-2">FREE shipping</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="bg-[#F16521] hover:bg-[#E55A1C]"
                        >
                          Add to cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}