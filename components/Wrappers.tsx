import { useState } from "react";
import {countries} from "./countries";
import "../styles/wrapper.css";
import React=require("react");

interface Country {
  country_id: string;
  probability: number;
}

interface National {
  name: string;
  country: Country[];
}

export function Wrapper() {
  const [nationalize, setNationalize] = useState<National>({
    name: "",
    country: [],
  });
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");

  function handleChange(event: any) {
    setName(event.target.value);
  }

  function probability(){
    return nationalize.country[0].probability * 100
  }

  const loadCountry = async (name: string) => {
    const response = await fetch("https://api.nationalize.io?name=" + name);
    const data = await response.json();
    const fName = countries.filter(
      (country) => country.code === data.country[0].country_id
    );
    setNationalize(data);
    setLoading(false);
    setFullName(fName[0].name);
  };

  return (
    <div className="container">
      <div className="full-form">
        <div className="form">
          <form action="">
            <label htmlFor="">Digite o nome </label>

            <input
              type="text"
              id="input-name"
              onChange={handleChange}
              value={name}
            />
          </form>

          <button
            type="button"
            className="btn-gerar"
            onClick={() => {
              loadCountry(name);
            }}
          >
            Gerar probabilidade
          </button>
        </div>

        <h2>País com maior probabilidade</h2>
        {loading ? (
          <div>
            <h3>País:</h3>
            <h3>Probabilidade:</h3>
          </div>
        ) : (
          <div>
            <h3>País: {fullName}</h3>
            <h3>Probabilidade: {probability().toFixed(2)} %</h3> 
          </div>
        )}
      </div>
    </div>
  );
}
