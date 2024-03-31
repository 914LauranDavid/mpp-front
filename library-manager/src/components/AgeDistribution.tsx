import { PieChart } from "@mui/x-charts";
import { Cat } from "../model/Cat";
import { Box } from "@mui/material";
import { useCatStore } from "../stores/CatStore";

function AgeDistribution() {
    const { allCats } = useCatStore();

    const data: { id: number; value: number; label: string; }[] = [];
    allCats.map(cat => {
        let found = false;
        for (let pieceOfData of data)
            if (pieceOfData.label === "" + cat.age + " year olds") {
                pieceOfData.value++;
                found = true;
            }
        if (!found)
            data.push({ id: cat.id, value: 1, label: "" + cat.age + " year olds" });
    })

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
                width={400}
                height={200}
            />
        </Box>
    );
}

export default AgeDistribution;