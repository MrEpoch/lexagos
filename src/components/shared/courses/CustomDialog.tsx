'use client';
import { Plus } from 'lucide-react';
import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import ActionForm from './ActionForm';


export default function CustomDialog({ isUpdate = false, children }: { isUpdate?: boolean, children: React.ReactNode }) {
  return (
            <Dialog>
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>
          <DialogContent className="h-full">
            <ScrollArea className="h-full">
                    <DialogHeader>
          <DialogTitle>{isUpdate ? "Update course" : "Create course"}</DialogTitle>
          <DialogDescription>
            Fill in course information
          </DialogDescription>
        </DialogHeader>
        <ActionForm isUpdate={isUpdate} />
            </ScrollArea>
          </DialogContent>
        </Dialog>  )
}
