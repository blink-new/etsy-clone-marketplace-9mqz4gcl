import { Link } from 'react-router-dom'
import { ArrowRight, Star, Heart } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useCart } from '../hooks/useCart'
import { toast } from 'sonner'

export default function HomePage() {
  const { addToCart } = useCart()

  const featuredProducts = [
    {
      id: '1',
      title: 'Handmade Ceramic Mug Set',
      price: 45.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
      seller: 'PotteryStudio',
      rating: 4.8,
      reviews: 127,
      badge: 'Bestseller'
    },
    {
      id: '2',
      title: 'Vintage Leather Journal',
      price: 32.50,
      image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop',
      seller: 'VintageFinds',
      rating: 4.9,
      reviews: 89,
      badge: 'Etsy\'s Pick'
    },
    {
      id: '3',
      title: 'Macrame Wall Hanging',
      price: 78.00,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      seller: 'BohoDecor',
      rating: 4.7,
      reviews: 203,
      badge: 'FREE shipping'
    },
    {
      id: '4',
      title: 'Sterling Silver Ring',
      price: 125.00,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      seller: 'SilverCraft',
      rating: 4.9,
      reviews: 156,
      badge: 'Star Seller'
    }
  ]

  const categories = [
    {
      name: 'Jewelry & Accessories',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      count: '2.1M+ items'
    },
    {
      name: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      count: '1.8M+ items'
    },
    {
      name: 'Art & Collectibles',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop',
      count: '950K+ items'
    },
    {
      name: 'Clothing & Shoes',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop',
      count: '1.2M+ items'
    }
  ]

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      seller: product.seller
    })
    toast.success('Added to cart!')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#F16521] to-[#E55A1C] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Find the perfect gift for everyone
              </h1>
              <p className="text-xl mb-8 text-orange-100">
                Discover unique items, from handmade pieces to vintage treasures, 
                all made or curated by small businesses.
              </p>
              <Link to="/shop">
                <Button size="lg" className="bg-white text-[#F16521] hover:bg-gray-100 font-semibold px-8 py-3">
                  Start shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Handmade crafts"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.8 average rating</span>
                </div>
                <p className="text-sm text-gray-600">from 2M+ happy customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by category
            </h2>
            <p className="text-lg text-gray-600">
              Explore our most popular categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Editor's Picks
              </h2>
              <p className="text-lg text-gray-600">
                Curated items from our favorite shops
              </p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="hidden sm:flex">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
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
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 bg-[#F16521] text-white">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 mb-2 hover:text-[#F16521] transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{product.seller}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#00A693] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to start selling?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Turn your creative passion into a thriving business. 
            Join millions of sellers on Etsy.
          </p>
          <Button size="lg" className="bg-white text-[#00A693] hover:bg-gray-100 font-semibold px-8 py-3">
            Open your Etsy shop
          </Button>
        </div>
      </section>
    </div>
  )
}