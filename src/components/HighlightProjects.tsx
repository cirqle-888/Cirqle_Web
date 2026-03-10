import { motion } from 'framer-motion';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay
} from '@/components/ui/dialog'; // Adjust this import based on your folder structure

export default function HighlightProjects() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Loop through your projects here. This is a single card example. */}
      <Dialog>
        
        {/* 1. USE asChild: This prevents rendering an extra <button> and passes the click directly to the motion.div */}
        <DialogTrigger asChild>
          
          {/* 2. THE CARD: Add cursor-pointer so users know it's clickable */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition-colors hover:bg-gray-50"
          >
            <h3 className="text-lg font-bold">Project Name</h3>
            <p className="mt-2 text-sm text-gray-600">
              Click anywhere on this card to open the details.
            </p>
          </motion.div>
          
        </DialogTrigger>

        {/* 3. USE DialogPortal: This teleports the modal out of the motion.div and into the <body>, preventing all positioning conflicts */}
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
          
          <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle>Project Details</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              Here is the full information about the highlighted project. Because of the Portal, the Framer Motion transforms on the card won't break this layout.
            </div>
          </DialogContent>
          
        </DialogPortal>
      </Dialog>
    </div>
  );
}
