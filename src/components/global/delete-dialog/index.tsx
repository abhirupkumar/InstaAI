'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

type Props = {
    onYes: () => void;
    buttonText: string;
    dialogText: string;
}

export default function DeleteDialog({ onYes, buttonText, dialogText }: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleYes = async () => {
        setLoading(true);
        onYes();
        setLoading(false);
        setOpen(false);
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                    >
                        {buttonText}
                    </button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{dialogText}</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <button
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            No
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none disabled:opacity-50"
                            onClick={handleYes}
                            disabled={loading}
                        >
                            {loading ? 'Deleting...' : 'Yes'}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
