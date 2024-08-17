import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    RadioGroup,
    FormControlLabel,
    Radio,
    CardContent,
    Card,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCatStore } from "../../stores/CatStore";
import { useAuth0 } from "@auth0/auth0-react";
import SillyLoading from "../utilities/SillyLoading";

export interface CatQuizQuestion {
    question: string;
    options: string[];
    answer: string;
}

function OwnedCatDetails() {
    const { getIdTokenClaims } = useAuth0();
    const [open, setOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [questions, setQuestions] = useState<CatQuizQuestion[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    const { getCatById, updateCatCuteness, getQuizQuestions, setCatAvatar } = useCatStore();

    const [avatarPrompt, setAvatarPrompt] = useState("empty");
    const [avatarResponse, setAvatarResponse] = useState("Describe how you want your cat to look. Color, eye size, accessories etc.");

    const params = useParams<{ id: string }>();
    const id = params.id;

    if (!id) {
        console.log("params incorrect");
        return <h1>The parameters are incorrect</h1>;
    }

    const [cat, setCat] = useState({ id: parseInt(id), name: "", age: -1, weight: -1, cuteness: -1, ownerId: "", avatarUrl: "" });

    useEffect(() => {
        getCatById(parseInt(id)).then(received => setCat(received));
    }, []);

    const fetchQuestions = async () => {
        try {
            const generatedQuestions = await getQuizQuestions();
            console.log('ownedcatdetails received these questions: ' + JSON.stringify(generatedQuestions));
            setQuestions(generatedQuestions);
            setAnswers(Array(generatedQuestions.length).fill(""));
        } catch (error) {
            console.error('Error fetching questions: ', error);
        }
    };

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmitQuiz = () => {
        let correctCount = computeCorrectCount();
        setCorrectAnswersCount(correctCount);
        updateCatCuteness(cat.id, cat.cuteness + correctCount).then(() => {
            getCatById(parseInt(id)).then(received => setCat(received));
        });
        setQuizSubmitted(true);
        setOpen(false);
        setFeedbackOpen(true);
    };

    const computeCorrectCount = () => {
        let correctCount = 0;
        for (let i = 0; i < questions.length; i++) {
            if (answers[i] === questions[i].answer) {
                correctCount++;
            }
        }
        return correctCount;
    }

    const handleShowQuiz = () => {
        setQuestions([]);
        setOpen(true);
        fetchQuestions();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFeedbackClose = () => {
        setFeedbackOpen(false);
    };

    const handleAvatarPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvatarPrompt(e.target.value);
    };

    const handleSubmitAvatar = async () => {
        setAvatarResponse("Generating...");
        try {
            getIdTokenClaims().then(async tokenClaims => {
                if (tokenClaims !== undefined) {
                    const token = tokenClaims.__raw;

                    await setCatAvatar(cat.id, avatarPrompt, token);
                    setAvatarResponse("Successfully set the avatar.");
                    getCatById(parseInt(id)).then(received => setCat(received));
                }
            });
        } catch (error) {
            console.error('Error setting avatar:', error);
            setAvatarResponse('Failed to set avatar');
        }
    };

    return (
        <Box>
            <Card sx={{ maxWidth: 600, margin: "auto", p: 2, mb: 4 }}>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: "200%" }}>{cat.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 800 }}>Age</TableCell>
                                    <TableCell sx={{ fontStyle: 'italic' }}>{cat.age}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 800 }}>Weight</TableCell>
                                    <TableCell sx={{ fontStyle: 'italic' }}>{cat.weight}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ textAlign: 'center' }}>
                                        {cat.avatarUrl ? (
                                            <img src={cat.avatarUrl} alt="Cat Avatar" style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} />
                                        ) : (
                                            <span>No avatar :(</span>
                                        )}
                                        <Box sx={{ mb: 2 }}>
                                            <Button variant="contained" color="primary" onClick={() => setAvatarPrompt("Silly tabby cat")} sx={{ mb: 1 }}>
                                                Create Avatar
                                            </Button>
                                            {avatarPrompt !== "empty" && (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <TextField
                                                        label="Avatar Prompt"
                                                        value={avatarPrompt}
                                                        onChange={handleAvatarPromptChange}
                                                        sx={{ mr: 2 }}
                                                    />
                                                    <Button variant="contained" color="secondary" onClick={handleSubmitAvatar} sx={{ mr: 1 }}>
                                                        generate
                                                    </Button>

                                                    <Button variant="outlined" color="secondary" onClick={() => setAvatarPrompt("empty")}>
                                                        close
                                                    </Button>

                                                </Box>
                                            )}
                                            {avatarPrompt !== "empty" && avatarResponse && (
                                                <Box>
                                                    <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                                                        {avatarResponse}
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ mt: 1, color: 'gray' }}>
                                                        Generated with <a href="https://cat-avatars.vercel.app/">Cat Avatar Generator</a> <br />
                                                        and OpenAI API
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{
                                        fontStyle: 'italic', textAlign: 'center',
                                        color: 'purple', fontWeight: 'bold', fontSize: '150%'
                                    }}>{cat.cuteness} cuteness
                                        <Button variant="contained" color="secondary" onClick={handleShowQuiz}
                                            sx={{ mb: 2, fontWeight: 600, ml: 3 }}>
                                            Take Quiz <br />
                                            & increase
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>



            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundImage: 'url(/images/cat_doing_exam.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', color: 'pink' }}>
                    Quiz for {cat.name}'s cuteness <br />
                    Generated by AI
                </DialogTitle>
                <DialogContent
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '16px',
                    }}
                >
                    {questions.length === 0 && <SillyLoading />}
                    {questions.map((q, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>{q.question}</Typography>
                            <RadioGroup
                                name={`question-${index}`}
                                value={answers[index]}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                            >
                                {q.options.map((option, optIndex) => (
                                    <FormControlLabel key={optIndex} value={option} control={<Radio />} label={option} />
                                ))}
                            </RadioGroup>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained">Cancel</Button>
                    <Button onClick={handleSubmitQuiz} variant="contained" color="primary">Submit</Button>
                </DialogActions>
            </Dialog>

            {quizSubmitted && (
                <Card sx={{ maxWidth: 800, margin: "auto", mt: 3 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Quiz Results</Typography>
                        <Typography variant="body1">
                            {correctAnswersCount} out of {questions.length} <br />
                            {cat.name}'s cuteness is now {cat.cuteness}
                        </Typography>
                    </CardContent>
                </Card>
            )}

            <Dialog
                open={feedbackOpen}
                onClose={handleFeedbackClose}
                fullWidth
                maxWidth="md"
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundImage: 'url(/images/cat_doing_exam.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', color: 'pink' }}>The right answers</DialogTitle>
                <DialogContent
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '16px',
                    }}
                >
                    {questions.map((q, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    color: answers[index] === q.answer ? 'green' : 'red'
                                }}
                            >
                                {q.question}
                            </Typography>
                            {q.options.map((option, optIndex) => (
                                <Typography
                                    key={optIndex}
                                    variant="body2"
                                    sx={{
                                        color: option === q.answer ? 'green' : answers[index] === option ? 'red' : 'black'
                                    }}
                                >
                                    {option}
                                </Typography>
                            ))}
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFeedbackClose} color="secondary" variant="contained">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default OwnedCatDetails;
