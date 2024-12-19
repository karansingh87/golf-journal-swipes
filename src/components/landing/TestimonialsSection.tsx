import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import TestimonialCard from "./TestimonialCard";
import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "It's like having a golf coach who remembers everything you've ever discussed. The insights are incredibly valuable.",
        author: "Mark Stevens",
        title: "12 Handicap"
    },
    {
        quote: "Found swing changes I made 3 months ago that I'd completely forgotten about. Absolute game-changer for my progress.",
        author: "Sarah Thompson",
        title: "Scratch Golfer"
    },
    {
        quote: "Love how it captures my thoughts right after a round. The AI finds patterns I never would have noticed myself.",
        author: "Jordan Mitchell",
        title: "Club Champion"
    },
    {
        quote: "This app has transformed how I track my progress. The voice notes make it so easy to record insights during practice.",
        author: "Alex Rivera",
        title: "Golf Enthusiast"
    }
];

const TestimonialsSection = () => {
    return (
        <section className="py-24 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto"
            >
                <Carousel
                    opts={{
                        align: "start",
                        loop: true
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-[450px]">
                                <TestimonialCard {...testimonial} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </motion.div>
        </section>
    );
};

export default TestimonialsSection;