import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { LightbulbIcon } from 'lucide-react';

interface AnalysisCardProps {
  title: string;
  content?: string | string[];
  className?: string;
  isOverview?: boolean;
  index?: number;
  strengthRating?: number;
}

const AnalysisCard = ({ 
  title, 
  content, 
  className, 
  isOverview = false, 
  index = 0,
  strengthRating 
}: AnalysisCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="w-full"
  >
    <Card className={cn(
      "relative overflow-hidden border-none rounded-3xl transition-all duration-200", 
      isOverview ? "bg-gradient-to-br from-emerald-500 to-emerald-600" : "bg-gradient-to-br from-emerald-500 to-emerald-600",
      className
    )}>
      <div className="absolute top-4 left-4">
        <div className="bg-white/20 p-2 rounded-xl">
          <LightbulbIcon className="h-6 w-6 text-white" />
        </div>
      </div>
      
      {strengthRating && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="bg-white rounded-full px-4 py-1 text-emerald-600 font-semibold">
            This Week
          </div>
          <button className="text-white/80 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
          </button>
        </div>
      )}

      <CardContent className="p-8 pt-20">
        {strengthRating && (
          <div className="mb-4">
            <div className="text-7xl font-bold text-white flex items-start">
              <span className="text-5xl mr-2">+</span>
              {strengthRating}
              <span className="text-5xl ml-1">%</span>
            </div>
          </div>
        )}
        
        {typeof content === 'string' ? (
          <ReactMarkdown
            className={cn(
              "prose max-w-none text-white/90",
              strengthRating ? "text-xl" : "text-base"
            )}
            components={{
              p: ({ children }) => <p className="text-white/90 mb-4 last:mb-0">{children}</p>,
              li: ({ children }) => (
                <li className="flex items-start gap-2 mb-2">
                  <span className="mt-2 h-1 w-1 rounded-full flex-shrink-0 bg-white/80" />
                  <span>{children}</span>
                </li>
              ),
              ul: ({ children }) => <ul className="list-none pl-0 space-y-2 mt-4">{children}</ul>,
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <ul className="list-none pl-0 space-y-2">
            {content?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-white/90">
                <span className="mt-2 h-1 w-1 rounded-full flex-shrink-0 bg-white/80" />
                <ReactMarkdown
                  className="prose max-w-none text-white/90"
                  components={{
                    p: ({ children }) => <p className="mb-0">{children}</p>,
                  }}
                >
                  {item}
                </ReactMarkdown>
              </li>
            ))}
          </ul>
        )}

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === index % 6 ? "w-8 bg-white" : "w-1.5 bg-white/30"
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default AnalysisCard;