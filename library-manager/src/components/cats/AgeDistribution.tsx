import { PieChart } from "@mui/x-charts";
import { Box } from "@mui/material";
import { useCatStore } from "../../stores/CatStore";
import { useEffect } from 'react';

function AgeDistribution() {
    const { ageDistribution, fetchAgeDistribution } = useCatStore();

    useEffect(() => {
        fetchAgeDistribution();
        console.log('agedistribution: ' + JSON.stringify(ageDistribution));
    }, []);

    const data: { id: number; value: number; label: string; }[] = [];
    ageDistribution.map(ageAndCount => {
        let age = ageAndCount.age;
        let count = ageAndCount.count;
        data.push({id: age, value: count, label: "" + age + " year olds"});
    });

    return (
        <Box sx={{ bgcolor: '#f8faca' }}>
            <PieChart
                series={[
                    {
                        data: data,
                        innerRadius: 20,
                        paddingAngle: 2
                    },
                ]}
                width={700}
                height={300}
            />
        </Box>
    );
}

export default AgeDistribution;