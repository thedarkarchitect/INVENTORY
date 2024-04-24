"use client";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
	const [search, setSearch] = useState("");
	const [product, setProduct] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(0);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const getProduct = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/getProducts");
				const data = await response.json();
				console.log(data);
				setProducts(data.product);
			} catch (error) {
				console.error("Error", error);
			}
		};
		getProduct();
	}, []);

	

	const addProduct = async (item) => {
		try {
			console.log(item);
			const response = await fetch("/api/addProducts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(item),
			});

			if (response.ok) {
				//Product added successfully
				console.log({ message: "Product added Successfully", item });
			} else {
				console.error("Error adding product");
			}
		} catch (error) {
			console.error("Error", error);
		}
	};

	const postForm = (e) => {
		e.preventDefault();

		const newProduct = {
			product,
			quantity,
			price,
		};

		addProduct(newProduct);
	};

	return (
		<>
			<Header />
			<div className="container mx-8">
				<div className="mt-8">
					<h1 className="text-2xl font-bold mb-4">Search a Product</h1>
					<div className="flex items-center mb-4">
						<input
							name="search"
							id="search"
							type="text"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							placeholder="Search..."
							className="border-2 border-gray-400 px-4 py-2 w-full mr-4 rounded-lg"
						/>
						<select className="border-2 rounded-lg border-gray-400 px-4 py-2">
							<option value="name">By Name</option>
							<option value="category">By Category</option>
							{/* Add more options if needed */}
						</select>
					</div>
				</div>
				<h1 className="text-2xl font-bold mt-8 mb-4">Add Product</h1>
				<form
					id="addProduct"
					name="productForm"
					className="max-w-md mx-auto"
					onSubmit={postForm}>
					<div className="mb-4">
						<label htmlFor="product" className="block mb-2">
							Product Name:
						</label>
						<input
							type="text"
							name="product"
							id="product"
							value={product}
							onChange={(e) => setProduct(e.target.value)}
							className="border-2 border-gray-400 px-4 py-2 w-full rounded-lg"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="quantity" className="block mb-2">
							Quantity:
						</label>
						<input
							name="quantity"
							id="quantity"
							type="number"
							required
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							className="border-2 border-gray-400 px-4 py-2 w-full rounded-lg"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="price" className="block mb-2">
							Price:
						</label>
						<input
							name="price"
							id="price"
							type="number"
							value={price}
							required
							onChange={(e) => setPrice(e.target.value)}
							className="border-2 border-gray-400 px-4 py-2 w-full rounded-lg"
						/>
					</div>
					{/* Add more input fields for additional product information if needed */}
					<button
						className="bg-blue-500 rounded-lg p-1 hover:bg-blue-400"
						type="submit">
						AddProduct
					</button>
				</form>
				<h1 className="text-2xl font-bold mt-8 mb-4">Display Current Stock</h1>
				<div className="overflow-x-auto mb-6">
					<table className="table-auto border-collapse border border-gray-400 w-full">
						<thead>
							<tr>
								<th className="border border-gray-400 px-4 py-2">
									Product Name
								</th>
								<th className="border border-gray-400 px-4 py-2">Quantity</th>
								<th className="border border-gray-400 px-4 py-2">Price</th>
								{/* Add more table headers if needed */}
							</tr>
						</thead>
						<tbody>
							{/* Replace the static data below with your dynamic data */}
							{ 
								products.map((product) => (
									<tr>
								<td className="border border-gray-400 text-center px-4 py-2">{product.name}</td>
								<td className="border border-gray-400 text-center px-4 py-2">{product.qty}</td>
								<td className="border border-gray-400 text-center px-4 py-2">UGX {product.price} /=</td>
							</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
