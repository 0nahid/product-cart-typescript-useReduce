import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { useReducer, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface Products {
    id: number;
    name: string;
    price: number;
}

type Actiontypes = { type: 'ADD_PRODUCT', payload: string, price: number } | { type: 'REMOVE_PRODUCT', payload: number };

const ProductsList: Products[] = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    { id: 4, name: 'Product 4', price: 40 },
    { id: 5, name: 'Product 5', price: 50 },
    { id: 6, name: 'Product 6', price: 60 },
    { id: 7, name: 'Product 7', price: 70 },
    { id: 8, name: 'Product 8', price: 80 },
    { id: 9, name: 'Product 9', price: 90 },
    { id: 10, name: 'Product 10', price: 100 }
];

export default function Product() {
    const [products] = useState(ProductsList as Products[]);
    const reducer = (state: Products[], action: Actiontypes) => {
        switch (action.type) {
            case 'ADD_PRODUCT':
                return [...state, { id: state.length + 1, name: action.payload, price: action.price }];
            case 'REMOVE_PRODUCT':
                return state.filter(product => product.id !== action.payload);
            default:
                return state;
        }
    }
    const [carts, dispatch] = useReducer(reducer, []);
    const addToCart = (product: Products) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product.name, price: product.price });
    };
    const total = carts.reduce((acc, curr) => acc + curr.price, 0);

    const removeFromCart = (id: number) => {
        dispatch({ type: 'REMOVE_PRODUCT', payload: id });
    };
    console.log(total);
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4}>
                    <Grid xs={6}>
                        <h1>Product Lists</h1>
                        {
                            products.map((product) => {
                                return (
                                    <Item style={{
                                        marginTop: '10px',
                                    }}
                                        key={product.id}>
                                        {product.name} - {product.price} $   <Button variant="contained" endIcon={<AddShoppingCartIcon />}
                                            onClick={() => addToCart(product)}
                                        >
                                            cart
                                        </Button>

                                    </Item>
                                )
                            })
                        }
                    </Grid>
                    <Grid xs={6}>
                        {
                            carts.length > 0 ? <>
                                <h1>Cart Items:
                                    {carts.length}
                                </h1>
                                <h1>
                                    Total: {total} $
                                </h1>
                                {
                                    carts.map((cart) => {
                                        return (
                                            <Item style={{
                                                marginTop: '10px',
                                            }} key={cart.id}>
                                                {cart.name} - {cart.price} $ <Button variant="contained" color="error" endIcon={<DeleteIcon />}
                                                    onClick={() => removeFromCart(cart.id)}
                                                >Remove</Button>
                                            </Item>
                                        )
                                    })
                                }
                            </> :
                                <>
                                    <h1>
                                        Cart is empty
                                    </h1>
                                </>
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
