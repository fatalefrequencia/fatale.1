import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface CreatePlaylistDialogProps {
  open: boolean
  onClose: () => void
}

export function CreatePlaylistDialog({ open, onClose }: CreatePlaylistDialogProps) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle playlist creation
    const playlistId = Date.now().toString()
    navigate(`/playlist/${playlistId}`)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-red-900/20">
        <DialogHeader>
          <DialogTitle className="text-red-300">Create New Playlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-red-300 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-3 py-2 text-red-300 focus:outline-none focus:border-red-500"
              placeholder="My Playlist"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-red-300 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-3 py-2 text-red-300 focus:outline-none focus:border-red-500 h-24"
              placeholder="Describe your playlist..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              Create Playlist
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}