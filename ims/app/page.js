"use client";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
	const [search, setSearch] = useState("");
	const [product, setProduct] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(0);
	const [query, setQuery] = useState("");
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dropdown, setDropdown] = useState([
		{
			"id": 2,
			"name": "shoes",
			"quantity": "45",
			"price": "1234"
		}
	])

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

	const onDropdownEdit = async (e) => {
		setQuery(e.target.value);
		if(!loading) {
			setLoading(true);
			const response = await fetch(`/api/search?query=${query}`);
			let resjson = await response.json();
			setDropdown(resjson.products);
			setLoading(false);
		}
		
	}

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
							onChange={onDropdownEdit}
							placeholder="Search..."
							className="border-2 border-gray-400 px-4 py-2 w-full mr-4 rounded-lg"
						/>
					</div>
					{
						loading && <div className="flex justify-center items-center ">
							<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
								<circle id="blue-segment" cx="50" cy="50" r="45" stroke="blue" stroke-width="10" fill="none">
									<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite" />
								</circle>
								<circle id="green-segment" cx="50" cy="50" r="45" stroke="green" stroke-width="10" fill="none" transform="rotate(120 50 50)">
									<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite" />
								</circle>
								<circle id="red-segment" cx="50" cy="50" r="45" stroke="red" stroke-width="10" fill="none" transform="rotate(240 50 50)">
									<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite" />
								</circle>
							</svg>
						</div>
					}
					{dropdown.map((item) => {
							return <div key={item.id} className="container">{item.name}</div>;
						})
					}
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
							{products.map((product) => (
								<tr>
									<td className="border border-gray-400 text-center px-4 py-2">
										{product.name}
									</td>
									<td className="border border-gray-400 text-center px-4 py-2">
										{product.qty}
									</td>
									<td className="border border-gray-400 text-center px-4 py-2">
										UGX {product.price} /=
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
