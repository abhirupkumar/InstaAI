import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-muted text-primary">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">InstaAI</h3>
                        <p className="text-sm">Revolutionizing customer engagement with AI-powered solutions.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-sm text-primary hover:text-primary/90">About Us</Link></li>
                            <li><Link href="/careers" className="text-sm text-primary hover:text-primary/90">Careers</Link></li>
                            <li><Link href="/contact" className="text-sm text-primary hover:text-primary/90">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="/terms" className="text-sm text-primary hover:text-primary/90">Terms of Service</Link></li>
                            <li><Link href="/privacy-policy" className="text-sm text-primary hover:text-primary/90">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 text-primary hover:text-primary/90">
                                <Facebook size={20} />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-gray-400 text-primary hover:text-primary/90">
                                <Twitter size={20} />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="text-gray-400 text-primary hover:text-primary/90">
                                <Instagram size={20} />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="#" className="text-gray-400 text-primary hover:text-primary/90">
                                <Linkedin size={20} />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-center">&copy; {new Date().getFullYear()} InstaAI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
