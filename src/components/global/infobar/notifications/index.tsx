import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export const Notifications = () => {
  return (
    <Button className="rounded-full py-6 bg-background hover:bg-secondary border-[1px]">
      <Bell
        color="#3352CC"
        fill="#3352CC"
      />
    </Button>
  )
}