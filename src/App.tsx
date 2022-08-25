import Container from '@mui/material/Container';
import Product from "./Components/Product";

export default function App() {
    return (
        <div
            style={{
                backgroundColor: '#f5f5f5',
            }}
        >
            <Container
                style={{
                    borderRadius: '10px',
                }}>
                <Product />
            </Container>
        </div>
    )
}
