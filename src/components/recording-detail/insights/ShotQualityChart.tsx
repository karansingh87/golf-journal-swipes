import { BarChart } from 'lucide-react';
import InsightCard from './InsightCard';
import { Bar, BarChart as RechartsBar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ClubData {
  club: string;
  quality: number;
}

interface ShotQualityProps {
  data: ClubData[];
}

const ShotQualityChart = ({ data }: ShotQualityProps) => {
  if (!data?.length) return null;

  return (
    <InsightCard title="Shot Quality by Club" icon={BarChart}>
      <div className="h-[200px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="club" 
              tick={{ fontSize: 12 }}
              interval={0}
              height={40}
              angle={-45}
              textAnchor="end"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Quality']}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <Bar 
              dataKey="quality" 
              fill="#4ade80"
              radius={[4, 4, 0, 0]}
            />
          </RechartsBar>
        </ResponsiveContainer>
      </div>
    </InsightCard>
  );
};

export default ShotQualityChart;