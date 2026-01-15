
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
    Check,
    Menu,
    X,
    Moon,
    Sun,
    ArrowRight,
    Star,
    Zap,
    Shield,
    Users,
    BarChart,
    Instagram,
    Linkedin,
    Github,
    Activity,
    Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/components/ThemeProvider"

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    const features = [
        {
            title: "Wikipedia-Powered Content",
            description: "Fetches accurate and up-to-date information directly from Wikipedia’s public API.",
            icon: <Zap className="size-5" />,
        },
        {
            title: "Swipe-Based Learning Experience",
            description: "Story-style vertical scrolling delivers knowledge in quick, digestible cards.",
            icon: <BarChart className="size-5" />,
        },
        {
            title: "Distraction-Free Reading",
            description: "Clean UI with no ads or clutter, allowing users to focus purely on content.",
            icon: <Users className="size-5" />,
        },
        {
            title: "Mobile-First & Responsive",
            description: "Designed for seamless use across mobile, tablet, and desktop devices.",
            icon: <Shield className="size-5" />,
        },
        {
            title: "Optimized Performance",
            description: "Lightweight architecture ensures fast loading and smooth transitions.",
            icon: <Activity className="size-5" />,
        },
        {
            title: "Dynamic Content Rendering",
            description: "Parses and formats Wikipedia data into visually engaging, bite-sized story cards.",
            icon: <Layers className="size-5" />,
        },
    ];


    return (
        <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
            <header
                className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
            >
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2 font-bold">
                        <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                            W
                        </div>
                        <span>WikiSnap</span>
                    </div>
                    <nav className="hidden md:flex gap-8">
                        <a
                            href="#features"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Explore
                        </a>
                        <a
                            href="#testimonials"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            GitHub
                        </a>
                    </nav>
                    <div className="hidden md:flex gap-4 items-center">
                        <Link to="/sign-in">
                            <Button variant="ghost" size="sm" className="rounded-full">
                                Login
                            </Button>
                        </Link>
                        <Link to="/sign-up">
                            <Button size="sm" className="rounded-full">
                                Sign Up
                            </Button>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </div>
                    <div className="flex items-center gap-4 md:hidden">
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>
                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
                    >
                        <div className="container py-4 flex flex-col gap-4">
                            <a href="#features" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                                Explore
                            </a>
                            <a href="#testimonials" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                                GitHub
                            </a>
                            <div className="flex gap-2 mt-4">
                                <Link to="/sign-in" className="flex-1">
                                    <Button variant="ghost" size="sm" className="w-full rounded-full">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/sign-up" className="flex-1">
                                    <Button size="sm" className="w-full rounded-full">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </header>
            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden">
                    <div className="container px-4 md:px-6 relative">
                        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center max-w-3xl mx-auto mb-12"
                        >
                            <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                                Learn Differently
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                Learn Anything. One Swipe at a Time.
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                WikiSnap transforms Wikipedia articles into a fast, scrollable feed inspired by TikTok — built for
                                learning.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/discover">
                                    <Button size="lg" className="rounded-full h-12 px-8 text-base">
                                        Explore Articles
                                        <ArrowRight className="ml-2 size-4" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base bg-transparent">
                                    View on GitHub
                                </Button>
                            </div>
                            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Check className="size-4 text-primary" />
                                    <span>No ads</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Check className="size-4 text-primary" />
                                    <span>Free to use</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Check className="size-4 text-primary" />
                                    <span>Open source</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative mx-auto max-w-5xl"
                        >
                            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20">
                                <img
                                    src="https://cdn.dribbble.com/userupload/12302729/file/original-fa372845e394ee85bebe0389b9d86871.png?resize=1504x1128&vertical=center"
                                    alt="WikiSnap app interface"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl opacity-70"></div>
                            <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-3xl opacity-70"></div>
                        </motion.div>
                    </div>
                </section>

                {/* Logos Section */}
                <section className="w-full py-12 border-y bg-muted/30">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <p className="text-sm font-medium text-muted-foreground">Used by learners worldwide</p>
                            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-8 w-24 bg-foreground/10 rounded animate-pulse" />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full py-20 md:py-32">
                    <div className="container px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                        >
                            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                                Features
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why WikiSnap?</h2>
                            <p className="max-w-[800px] text-muted-foreground md:text-lg">
                                Discover knowledge in a whole new way with a platform designed for the modern learner.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {features.map((feature, i) => (
                                <motion.div key={i} variants={item}>
                                    <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 hover:bg-muted/20">
                                        <CardContent className="p-6 flex flex-col h-full">
                                            <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                            <p className="text-muted-foreground">{feature.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

                    <div className="container px-4 md:px-6 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
                        >
                            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                                How It Works
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Start Learning in Three Steps</h2>
                            <p className="max-w-[800px] text-muted-foreground md:text-lg">Its easy to get started with WikiSnap.</p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
                            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0"></div>

                            {[
                                {
                                    step: "01",
                                    title: "Choose a Topic",
                                    description: "Select from a wide range of topics or search for what youre curious about.",
                                },
                                {
                                    step: "02",
                                    title: "Read Knowledge Cards",
                                    description: "Explore short, digestible cards with focused information.",
                                },
                                {
                                    step: "03",
                                    title: "Keep Learning",
                                    description: "Swipe to continue discovering and expanding your knowledge.",
                                },
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="relative z-10 flex flex-col items-center text-center space-y-4"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xl font-bold shadow-lg">
                                        {step.step}
                                    </div>
                                    <h3 className="text-xl font-bold">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section - Now "Use Cases" */}
                <section id="testimonials" className="w-full py-20 md:py-32">
                    <div className="container px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                        >
                            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                                Use Cases
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Who is This For?</h2>
                            <p className="max-w-[800px] text-muted-foreground md:text-lg">
                                WikiSnap is designed for anyone who loves learning and wants to do it more efficiently.
                            </p>
                        </motion.div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    title: "🎓 Students",
                                    role: "Academic excellence",
                                    description: "Quickly learn new subjects and reinforce your studies with digestible content.",
                                    rating: 5,
                                },
                                {
                                    title: "📚 Curious Learners",
                                    role: "Lifelong learning",
                                    description: "Discover fascinating topics and explore your interests with ease.",
                                    rating: 5,
                                },
                                {
                                    title: "🧠 Knowledge Explorers",
                                    role: "Deep exploration",
                                    description: "Dive deep into topics you're passionate about and expand your worldview.",
                                    rating: 5,
                                },
                                {
                                    title: "👨‍💻 Developers",
                                    role: "Tech learning",
                                    description: "Stay updated with technology concepts and programming fundamentals.",
                                    rating: 5,
                                },
                            ].map((use, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                >
                                    <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                                        <CardContent className="p-6 flex flex-col h-full">
                                            <div className="flex mb-4">
                                                {Array(use.rating)
                                                    .fill(0)
                                                    .map((_, j) => (
                                                        <Star key={j} className="size-4 text-yellow-500 fill-yellow-500" />
                                                    ))}
                                            </div>
                                            <p className="text-lg mb-6 flex-grow font-semibold">{use.title}</p>
                                            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                                                <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                                                    {use.title.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{use.role}</p>
                                                    <p className="text-sm text-muted-foreground">{use.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Stack Section - Replaces Pricing */}
                <section id="pricing" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

                    <div className="container px-4 md:px-6 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                        >
                            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                                Tech Stack
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built With</h2>
                            <p className="max-w-[800px] text-muted-foreground md:text-lg">
                                WikiSnap is built with modern web technologies for optimal performance.
                            </p>
                        </motion.div>

                        <div className="mx-auto max-w-5xl">
                            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                                {[
                                    {
                                        name: "React",
                                        description: "Fast, responsive UI library",
                                    },
                                    {
                                        name: "TypeScript",
                                        description: "Type-safe development",
                                    },
                                    {
                                        name: "Wikipedia API",
                                        description: "Reliable content source",
                                    },
                                    {
                                        name: "Tailwind CSS",
                                        description: "Beautiful styling",
                                    },
                                    {
                                        name: "Vite",
                                        description: "Optimized build tool",
                                    },
                                    {
                                        name: "Open Source",
                                        description: "Community-driven",
                                    },
                                ].map((tech, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                    >
                                        <Card className="relative overflow-hidden h-full border-border/40 shadow-md bg-gradient-to-b from-background to-muted/10 backdrop-blur">
                                            <CardContent className="p-6 flex flex-col h-full">
                                                <h3 className="text-2xl font-bold">{tech.name}</h3>
                                                <p className="text-muted-foreground mt-2">{tech.description}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Roadmap Section - Replaces FAQ */}
                <section id="faq" className="w-full py-20 md:py-32">
                    <div className="container px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                        >
                            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                                Roadmap
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Whats Next?</h2>
                            <p className="max-w-[800px] text-muted-foreground md:text-lg">Exciting features coming to WikiSnap.</p>
                        </motion.div>

                        <div className="mx-auto max-w-3xl">
                            <Accordion type="single" collapsible className="w-full">
                                {[
                                    {
                                        question: "⬜ User Authentication",
                                        answer: "Save your progress, personalized feeds, and sync across devices with user accounts.",
                                    },
                                    {
                                        question: "⬜ Personalized Feeds",
                                        answer: "Get content recommendations based on your learning history and interests.",
                                    },
                                    {
                                        question: "⬜ Save & Bookmark Articles",
                                        answer: "Build your personal library of favorite articles for easy access and offline reading.",
                                    },
                                    {
                                        question: "⬜ Topic Recommendations",
                                        answer: "Discover new topics based on your learning patterns and interests.",
                                    },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                    >
                                        <AccordionItem value={`item-${i}`} className="border-b border-border/40 py-2">
                                            <AccordionTrigger className="text-left font-medium hover:no-underline">
                                                {item.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                                        </AccordionItem>
                                    </motion.div>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-20 md:py-32 bg-black text-white relative overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="container px-4 md:px-6 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center space-y-6 text-center"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Start Exploring Knowledge</h2>
                            <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                                Transform the way you learn with WikiSnap's innovative swipe-based learning experience.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <Link to="/discover">
                                    <Button size="lg" variant="secondary" className="rounded-full h-12 px-8 text-base">
                                        Explore Articles
                                        <ArrowRight className="ml-2 size-4" />
                                    </Button>
                                </Link>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                                >
                                    View on GitHub
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
                <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 font-bold">
                                <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                                    W
                                </div>
                                <span>WikiSnap</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Transform Wikipedia articles into a fast, scrollable feed. Learn anything, one swipe at a time.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <Instagram className="size-5" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <Linkedin className="size-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="size-5"
                                    >
                                        <path d="M4 4l11.733 16M4 20h16M20 4h.01" />
                                    </svg>
                                    <span className="sr-only">X</span>
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <Github className="size-5" />
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Explore
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        API
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Roadmap
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Guides
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold">Community</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Contribute
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Issues
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        Discussions
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        License
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
                        <p className="text-xs text-muted-foreground">
                            &copy; {new Date().getFullYear()} WikiSnap. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
