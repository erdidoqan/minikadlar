import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  message: string
  retry?: () => void
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Hata</AlertTitle>
      <AlertDescription className="flex items-center gap-4">
        {message}
        {retry && (
          <Button variant="outline" size="sm" onClick={retry} className="ml-auto">
            Tekrar Dene
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
