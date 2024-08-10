import { PieChart } from "@mui/x-charts";
import { Box } from "@mui/material";
import { useCatStore } from "../../stores/CatStore";
import { useEffect } from 'react';
import SillyLoading from "../utilities/SillyLoading";

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
        data.push({ id: age, value: count, label: "" + age + " y.o." });
    });

    return (
        <Box sx={{ bgcolor: '#f8faca' }}>
            {data.length > 0 ?
                (<PieChart
                    series={[
                        {
                            data: data,
                            innerRadius: 20,
                            paddingAngle: 2,
                            cornerRadius: 5
                        },
                    ]}
                    width={700}
                    height={300}
                    data-testid="age-distribution-chart"
                />)
                :
                (
                    <SillyLoading />
                )
            }
        </Box>
    );
}

export default AgeDistribution;