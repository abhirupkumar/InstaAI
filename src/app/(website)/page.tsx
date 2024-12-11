import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight, Box } from 'lucide-react'
import Image from 'next/image'
import { Navbar } from './_components/Navbar'
import { Footer } from './_components/Footer'
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <main>
                    {/* Hero Section */}
                    <section className="container mx-auto px-4 py-16">
                        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                Transform Your Customer Communication with Proxy
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl">
                                Proxy empowers businesses to streamline customer interactions effortlessly through popular messaging platforms. Experience enhanced engagement, faster responses, and improved customer satisfaction with our intuitive chatbot solutions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="min-w-[150px]">
                                    Get Started
                                </Button>
                                <Button size="lg" variant="outline" className="min-w-[150px]">
                                    Learn More
                                </Button>
                            </div>
                            <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden mt-16">
                                <Image
                                    src="/placeholder.svg"
                                    alt="Platform preview"
                                    width={1920}
                                    height={1080}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </section>
                    {/* Features Section */}
                    <section className="container mx-auto px-4 py-16 bg-muted">
                        <div className="flex flex-col items-center text-center">
                            <span className="text-sm font-medium mb-4">Connect</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mb-6">
                                Streamline Your Customer Communication Effortlessly
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mb-16">
                                Proxy simplifies customer interactions by automating responses through popular messaging platforms. This ensures your customers receive timely and accurate information, enhancing their experience.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center w-full max-w-6xl">
                                {/* Left Features */}
                                <div className="space-y-12">
                                    <div className="text-center space-y-3">
                                        <div className="flex justify-center">
                                            <Box className="h-8 w-8" />
                                        </div>
                                        <h3 className="font-semibold text-lg">Automate Replies to Comments on Instagram</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Proxy AI identifies key audience inquiries and responds to comments with precision, saving time while boosting engagement.
                                        </p>
                                    </div>
                                    <div className="text-center space-y-3">
                                        <div className="flex justify-center">
                                            <Box className="h-8 w-8" />
                                        </div>
                                        <h3 className="font-semibold text-lg">Effortless DM Handling</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Handle Instagram DMs seamlessly with our AI-powered system, ensuring timely and accurate responses for improved customer satisfaction.
                                        </p>
                                    </div>
                                </div>
                                {/* Center Image */}
                                <div className="w-full aspect-square bg-background rounded-lg overflow-hidden">
                                    <Image
                                        src="/placeholder.svg"
                                        alt="Platform preview"
                                        width={800}
                                        height={800}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Right Features */}
                                <div className="space-y-12">
                                    <div className="text-center space-y-3">
                                        <div className="flex justify-center">
                                            <Box className="h-8 w-8" />
                                        </div>
                                        <h3 className="font-semibold text-lg">Customizable Automation</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Tailor responses to match your brand slogan and customer needs, making every interaction feel personal yet efficient.
                                        </p>
                                    </div>
                                    <div className="text-center space-y-3">
                                        <div className="flex justify-center">
                                            <Box className="h-8 w-8" />
                                        </div>
                                        <h3 className="font-semibold text-lg">Real-Time Performance Analytics</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Track the performance of automated interactions and refine strategies with detailed insights from our dashboard.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-16">
                                <Button variant="outline" size="lg">
                                    Learn More
                                </Button>
                                <Button size="lg">
                                    Sign Up
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </section>
                    {/* Integration Section */}
                    <section className="container mx-auto px-4 py-16">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <span className="text-sm font-medium">Connect</span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                                    Seamless Integration Across All Messaging Platforms
                                </h2>
                                <p className="text-muted-foreground">
                                    Experience the power of multi-platform integration with Proxy. Our chatbot seamlessly connects with popular messaging apps like Instagram, WhatsApp, and Facebook, ensuring your business is always accessible. Enhance customer engagement and streamline communication effortlessly.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button variant="outline" size="lg">
                                        Learn More
                                    </Button>
                                    <Button size="lg">
                                        Sign Up
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
                                <Image
                                    src="/placeholder.svg"
                                    alt="Integration preview"
                                    width={1920}
                                    height={1080}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            {/* Hero Section */}
            <section className="bg-background">
                <div className="container mx-auto px-4 py-24">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
                                Revolutionizing Customer Engagement
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Effortlessly automate customer interactions with our AI-powered chatbot.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" variant="default" className="min-w-[150px]">
                                    Get Started
                                </Button>
                                <Button size="lg" variant="outline" className="min-w-[150px]">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 mt-12 md:mt-0">
                            <Image
                                src="/hero.svg"
                                alt="Hero illustration"
                                width={500}
                                height={500}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* AI Features Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
                        <Image
                            src="/placeholder.svg"
                            alt="AI Features preview"
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <span className="text-sm font-medium">Proxy AI</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            Experience Seamless AI-Driven Customer Interactions
                        </h2>
                        <p className="text-muted-foreground">
                            Our AI-driven responses ensure instant communication, enhancing customer satisfaction. Automate inquiries and provide accurate answers around the clock.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-8 pt-6">
                            <div className="space-y-3">
                                <Box className="h-8 w-8" />
                                <h3 className="font-semibold text-lg">Instant Replies</h3>
                                <p className="text-sm text-muted-foreground">
                                    Reduce response time and improve customer engagement effortlessly.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Box className="h-8 w-8" />
                                <h3 className="font-semibold text-lg">Smart Solutions</h3>
                                <p className="text-sm text-muted-foreground">
                                    Leverage AI to streamline communication and enhance user experience.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button variant="outline" size="lg">
                                Learn More
                            </Button>
                            <Button size="lg">
                                Sign Up
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Setup Section */}
            <section className="container mx-auto px-4 py-16 bg-muted">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            Effortless Setup and Intuitive Design for Seamless Communication Automation
                        </h2>
                        <p className="text-muted-foreground">
                            With Proxy, getting started is a breeze. Our user-friendly interface allows you to set up your chatbot in minutes, empowering you to engage with customers effortlessly.
                        </p>
                    </div>
                    <div className="w-full aspect-video bg-background rounded-lg overflow-hidden">
                        <Image
                            src="/placeholder.svg"
                            alt="Setup preview"
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section>
                <div className="container mx-auto px-4 py-24">
                    <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            Transform Your Customer Engagement
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Experience seamless communication with our chatbot. Sign up for a free trial today!
                        </p>
                        <Link className={buttonVariants({
                            size: 'lg',
                        })} href="/dashboard">
                            Try Out Now
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
