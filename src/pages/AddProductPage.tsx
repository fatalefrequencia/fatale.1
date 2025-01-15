import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Plus,
  DollarSign,
  Package,
  Tag,
  Info
} from 'lucide-react'

interface ProductImage {
  file: File
  preview: string
}

export default function AddProductPage() {
  const navigate = useNavigate()
  const [images, setImages] = useState<ProductImage[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const categories = [
    'Art',
    'Music',
    'Clothing',
    'Accessories',
    'Digital',
    'Other'
  ]

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages].slice(0, 5)) // Limit to 5 images
  }

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files)
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    navigate('/profile/dashboard')
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-red-300">Add New Product</h1>
            <p className="text-red-700">Create a new product listing</p>
          </div>
          <Button variant="ghost" onClick={() => navigate('/profile/dashboard')}>
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images */}
          <Card className="bg-red-950/20 border-red-900/20">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-red-300 mb-4">Product Images</h2>
              
              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Area */}
              {images.length < 5 && (
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive ? 'border-red-500 bg-red-500/10' : 'border-red-900/20'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      {dragActive ? (
                        <Upload className="h-12 w-12 text-red-500" />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-red-300 mb-2">
                        {dragActive ? 'Drop images here' : 'Drag and drop product images'}
                      </p>
                      <p className="text-red-700 text-sm">or click to browse</p>
                    </div>
                    <p className="text-xs text-red-700">
                      Maximum 5 images. Supported formats: JPG, PNG, GIF
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card className="bg-red-950/20 border-red-900/20">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-red-300">Product Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-red-300 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-red-300 mb-1">Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-700" />
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-red-900/20 border border-red-900/20 rounded-lg pl-10 pr-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-red-300 mb-1">Stock</label>
                    <div className="relative">
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-700" />
                      <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full bg-red-900/20 border border-red-900/20 rounded-lg pl-10 pr-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                        placeholder="Quantity"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-red-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                    required
                  >
                    <option value="">Select category...</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-red-300 mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-4 py-2 text-red-300 focus:outline-none focus:border-red-500 h-32"
                    placeholder="Describe your product..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-red-300 mb-1">Tags</label>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-300"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-700" />
                      <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="w-full bg-red-900/20 border border-red-900/20 rounded-lg pl-10 pr-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                        placeholder="Add tags..."
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={addTag}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/profile/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              Create Product
            </Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  )
}