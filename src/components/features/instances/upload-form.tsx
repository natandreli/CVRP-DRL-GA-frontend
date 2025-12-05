import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadInstance } from '@/services/api/instances'
import { IconUpload } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

type UploadFormProps = {
  onSuccess: () => void
}

export const UploadForm = ({ onSuccess }: UploadFormProps) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const uploadMutation = useMutation({
    mutationFn: uploadInstance,
    onSuccess: () => {
      toast.success('Instance uploaded successfully')
      queryClient.invalidateQueries({ queryKey: ['instances'] })
      setFile(null)
      onSuccess()
    },
    onError: () => {
      toast.error('Failed to upload instance')
    },
  })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      uploadMutation.mutate(file)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Upload Instance File
        </span>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Upload a CVRP instance file in VRPLIB or TSPLIB format
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
            dragActive
              ? 'border-slate-400 bg-slate-50 dark:border-slate-600 dark:bg-slate-800'
              : 'border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600'
          }`}
        >
          <input
            type="file"
            onChange={handleChange}
            accept=".vrp,.tsp,.txt"
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <IconUpload className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600" />
          <p className="mt-4 text-sm font-medium text-slate-900 dark:text-slate-100">
            {file ? file.name : 'Drop your file here, or click to browse'}
          </p>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            Supports .vrp, .tsp, or .txt files
          </p>
        </div>
        <div className="mt-10 flex justify-end gap-3">
          <Button type="button" variant="alt" onClick={() => setFile(null)} disabled={!file}>
            Clear
          </Button>
          <Button type="submit" isLoading={uploadMutation.isPending} disabled={!file}>
            Upload Instance
          </Button>
        </div>
      </form>
    </div>
  )
}
