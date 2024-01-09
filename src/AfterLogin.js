import React, { useEffect, useState } from "react";
import "./AfterLogin.css";
import { useNavigate } from "react-router-dom";

const AfterLogin = ({ mydata, setLogin, login }) => {
  const [urlsData, setUrlsData] = useState(null);
  const [shortenLink, setShortenLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalURL, setOriginalURL] = useState("");
  const [isCopied, setIsCopied] = useState(false); 
  
  const userName = localStorage.getItem("name");



  const navigate = useNavigate();
  const fetchShortenLink = async () => {
    try {
      const response = await fetch("https://url-4s79.onrender.com/link/shorten", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: originalURL }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortenLink(data.shortenLink);
      } else {
        console.error("Failed to fetch shorten link");
      }
    } catch (error) {
      console.error("Error during shorten link fetch:", error);
    }
  };

  useEffect(() => {
    const fetchUrlsData = async () => {
      try {
        const response = await fetch("https://url-4s79.onrender.com/link/urls", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getTokenFromCookie()}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUrlsData(data);
        } else {
          console.error("Failed to fetch URLs data");
        }
      } catch (error) {
        console.error("Error during URL data fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrlsData();
  }, []);

  const getTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

    if (tokenCookie) {
      return tokenCookie.split("=")[1];
    }

    return null;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchShortenLink();
  };

  const handleCopyClick = () => {
    const copyText = document.createElement("textarea");
    copyText.value = shortenLink;
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand("copy");
    document.body.removeChild(copyText);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLogin(false);
    navigate("/");
    localStorage.setItem("name", "");
  };

  return (
    <div className="container">
      <div className="navbarDiv">
        <div className="header-navbar">
          <div className="header-logo">
            <h1>Shortly</h1>
          </div>
          <div className="dashboard">
            <h3>{userName}</h3>

          </div>
          <div className="name">
          
              <h3 onClick={handleLogOut} style={{cursor:"pointer"}}>LogOut</h3>
            
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && urlsData && (
        <div>
          <div className="user-count">
            <div className="totalUrl">
              <h5>Total URLs Created</h5>
              <p>{urlsData.totalGeneratedUrls}</p>
            </div>
            <div className="totalUrl">
              <h5>Expired URLs</h5>
              <p>{urlsData.expiredLinkCount}</p>
            </div>
          </div>

          <div className="urlField">
            <form className="formClass" onSubmit={handleFormSubmit}>
              <label htmlFor="text" name="text">
                Create New Short URL
              </label>
              <input
                className="inputField"
                type="text"
                name="text"
                placeholder="Enter Your Original URL"
                value={originalURL}
                onChange={(e) => setOriginalURL(e.target.value)}
                required
              />
              <button type="submit">Create Short URL</button>
            </form>
          </div>
          {shortenLink && (
            <div className="shortlink">
              <h3>{shortenLink}</h3>
              <button onClick={handleCopyClick}>Copy</button>
              {isCopied && <span className="tooltip">Copied!</span>}
            </div>
          )}
          <div>
            {urlsData.allUrls.map((url, index) => (
              <div key={index} className="generatedURls">
                <div className="generatedShort">
                    <h3>Short URL</h3>
                  <p>{url.shortenedURL}</p>
                  <h3>OriginalURL</h3>
                  <p>{url.originalURL}</p>
                </div>
                <div className="visits">
                    <h3>Total Visits</h3>
                  <p>{url.visits}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AfterLogin;
