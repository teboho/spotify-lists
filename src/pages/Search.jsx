import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import reqAccessToken from "../utilities/Auth";

const Search = () => {
    const [searchName, setSearchName] = useState("");
    const [searchType, setSearchType] = useState("songname");
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const client_id = process.env.REACT_APP_CLIENT_ID;
        const client_secret = process.env.REACT_APP_CLIENT_SECRET;
        reqAccessToken(client_id, client_secret)
            .then((response) => response.json())
            .then((data) => {
                setAccessToken(data["access_token"]);
                console.log("Found Access Token");
            })
            .catch((err) => {
                console.error(err);
            });
    }, []); // only on first render

    function handleSubmit(event) {
        console.log(searchName + ", " + searchType)

        if (accessToken.length === 0) {
            console.log("Get access token!!!!!!")
            return;
        }

        

        console.log(process.env.REACT_APP_CLIENT_ID)
    }

    function handleChange(e) {
        console.log(e.target.value);
        setSearchName(e.target.value);
    }

    function handleSelect(event) {
        console.log(event);
        setSearchType(event);
    }

    return (
        <Form 
            onFinish={handleSubmit}
            className="geekblue-5"
            name="search"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, border: "1px solid", padding: "20px", margin: "10px auto", borderRadius: "25px"}}
            autoComplete="off">
            <Form.Item
                label="songname"
                name="songname"
                required="true"
            >
                <Input required onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                labelCol={{span: 4}}
                wrapperCol={{span:16}}
                label="Search type"
                name="searchType"
            >
                <Select
                    showSearch
                    placeholder="Search by ..."
                    defaultValue={{value: "songname", label: "Song name"}}
                    onSelect={handleSelect}
                    options={[
                        {
                            value: "songname",
                            label: "Song name",
                        },
                        {
                            value: "artist",
                            label: "Artist name"
                        },
                        {
                            value: "genre",
                            label: "Genre"
                        },
                        
                    ]}
                />
            </Form.Item>
            <Form.Item
                wrapperCol="20"
            >
                <Button type="primary" block htmlType="submit" shape="default"icon={<SearchOutlined />}>Search</Button>
            </Form.Item>
        </Form>
    );
}

export default Search;