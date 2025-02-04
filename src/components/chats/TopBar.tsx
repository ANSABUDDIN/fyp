
import { Avatar, AvatarImage } from '../ui/avatar'
import { Info, Phone, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { Link } from 'react-router-dom';
import { UserData } from '@/interfaces/data';

interface ChatTopbarProps {
    selectedUser: UserData;
    }
    
    export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];


export default function ChatTopbar({selectedUser}: ChatTopbarProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={'/user.png'}
              alt={'test'}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{selectedUser?.username}</span>
            <span className="text-xs">{selectedUser?.email}</span>
          </div>
        </div>

        <div>
          {TopbarIcons.map((icon, index) => (
            <Link
              key={index}
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
            >
              <icon.icon size={20} className="text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
  )
}