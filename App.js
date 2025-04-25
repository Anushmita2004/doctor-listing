import React, { useEffect, useState } from "react";

const SPECIALTIES = [
  "Gynaecologist", "ENT", "Diabetologist", "Cardiologist", "Physiotherapist",
  "Endocrinologist", "Orthopaedic", "Ophthalmologist", "Gastroenterologist",
  "Pulmonologist", "Psychiatrist", "Urologist", "Dietitian/Nutritionist",
  "Psychologist", "Sexologist", "Nephrologist", "Neurologist", "Oncologist"
];

function App() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [consultType, setConsultType] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(Array.isArray(data) ? data : []);
        setFiltered(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setDoctors([]);
        setFiltered([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = Array.isArray(doctors) ? [...doctors] : [];
    if (search)
      result = result.filter((doc) =>
        doc.name && doc.name.toLowerCase().includes(search.toLowerCase())
      );
    if (consultType)
      result = result.filter((doc) => doc.consultationType === consultType);
    if (specialties.length)
      result = result.filter((doc) =>
        Array.isArray(doc.specialties) &&
        specialties.every((spec) => doc.specialties.includes(spec))
      );
    setFiltered(result);
  }, [search, consultType, specialties, doctors]);

  const handleSpecialty = (spec) => {
    setSpecialties((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  return (
    <div style={{
      fontFamily: "Segoe UI, Arial, sans-serif",
      background: "#f0f4f8",
      minHeight: "100vh",
      padding: 0,
      margin: 0
    }}>
      <header style={{
        background: "#1976d2",
        color: "#fff",
        padding: "24px 0",
        textAlign: "center",
        marginBottom: 32,
        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.1)"
      }}>
        <h1 style={{ margin: 0, fontSize: 36, letterSpacing: 1 }}>Doctor Directory</h1>
        <p style={{ margin: 0, fontSize: 18, opacity: 0.8 }}>Find the right doctor for you</p>
      </header>
      <div style={{
        display: "flex",
        maxWidth: 1200,
        margin: "auto",
        gap: 32,
        padding: "0 16px"
      }}>
        {/* Sidebar Filters */}
        <aside style={{
          minWidth: 260,
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 2px 8px #e3e7ed",
          height: "fit-content"
        }}>
          <h3 style={{ marginTop: 0, color: "#1976d2" }}>Filter</h3>
          <div style={{ marginBottom: 24 }}>
            <strong>Consultation Type</strong>
            <div style={{ marginTop: 8 }}>
              <label style={{ display: "block", marginBottom: 6 }}>
                <input
                  type="radio"
                  name="consult"
                  value="Video Consult"
                  checked={consultType === "Video Consult"}
                  onChange={() => setConsultType("Video Consult")}
                /> Video Consult
              </label>
              <label style={{ display: "block", marginBottom: 6 }}>
                <input
                  type="radio"
                  name="consult"
                  value="In Clinic"
                  checked={consultType === "In Clinic"}
                  onChange={() => setConsultType("In Clinic")}
                /> In Clinic
              </label>
              <button
                onClick={() => setConsultType("")}
                style={{
                  marginTop: 6,
                  background: "#eee",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 13
                }}
              >
                Clear
              </button>
            </div>
          </div>
          <div>
            <strong>Specialties</strong>
            <div style={{
              maxHeight: 180,
              overflowY: "auto",
              marginTop: 8,
              marginBottom: 8
            }}>
              {SPECIALTIES.map((spec) => (
                <label key={spec} style={{ display: "block", marginBottom: 4 }}>
                  <input
                    type="checkbox"
                    checked={specialties.includes(spec)}
                    onChange={() => handleSpecialty(spec)}
                  /> {spec}
                </label>
              ))}
            </div>
            <button
              onClick={() => setSpecialties([])}
              style={{
                marginTop: 4,
                background: "#eee",
                border: "none",
                padding: "4px 10px",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 13
              }}
            >
              Clear
            </button>
          </div>
        </aside>
        {/* Main Content */}
        <main style={{ flex: 1 }}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search doctor by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              fontSize: 16,
              borderRadius: 6,
              border: "1px solid #d0d7de",
              marginBottom: 18,
              boxSizing: "border-box"
            }}
          />
          {loading ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <span style={{ fontSize: 18, color: "#888" }}>Loading doctors...</span>
            </div>
          ) : (
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24
            }}>
              {Array.isArray(filtered) && filtered.length ? filtered.map((doc) => (
                <li
                  key={doc.id}
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: 24,
                    boxShadow: "0 2px 8px #e3e7ed",
                    marginBottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10
                  }}
                >
                  <h2 style={{
                    margin: 0,
                    color: "#1976d2",
                    fontSize: 22,
                    fontWeight: 600
                  }}>{doc.name}</h2>
                  <div style={{
                    color: "#555",
                    fontWeight: 500,
                    marginBottom: 4
                  }}>
                    {Array.isArray(doc.specialties) && doc.specialties.length > 0
                      ? doc.specialties.join(", ")
                      : "No specialties"}
                  </div>
                  <div style={{
                    display: "flex",
                    gap: 16,
                    fontSize: 15,
                    color: "#444"
                  }}>
                    <span>Experience: {doc.experience} yrs</span>
                    <span>Fee: ₹{doc.fees}</span>
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: "#888",
                    marginTop: 6
                  }}>
                    {doc.consultationType}
                  </div>
                </li>
              )) : (
                <div style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  color: "#888",
                  fontSize: 18,
                  padding: 40
                }}>
                  No doctors found.
                </div>
              )}
            </ul>
          )}
        </main>
      </div>
      <footer style={{
        textAlign: "center",
        marginTop: 40,
        padding: 20,
        color: "#888",
        fontSize: 14
      }}>
        &copy; {new Date().getFullYear()} Doctor Directory. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
