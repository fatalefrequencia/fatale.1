import { useState, useRef } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Image, Music, FileText, X } from 'lucide-react'

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState('public')

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
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle upload logic here
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="bg-red-950/20 border-red-900/20">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Upload Area */}
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
                  ref={inputRef}
                  type="file"
                  multiple
                  onChange={handleChange}
                  className="hidden"
                />
                
                <Upload className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <p className="text-red-300 mb-2">Drag and drop your files here</p>
                <p className="text-red-700 text-sm mb-4">or</p>
                <Button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Browse Files
                </Button>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-red-900/20 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {file.type.includes('image') && <Image className="h-4 w-4 text-red-500" />}
                        {file.type.includes('audio') && <Music className="h-4 w-4 text-red-500" />}
                        {file.type.includes('text') && <FileText className="h-4 w-4 text-red-500" />}
                        <span className="text-red-300 text-sm">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="hover:bg-red-500/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-red-300 text-sm mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-red-300 text-sm mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-4 py-2 text-red-300 focus:outline-none focus:border-red-500 h-32"
                  />
                </div>

                <div>
                  <label className="block text-red-300 text-sm mb-2">Visibility</label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                Upload
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}