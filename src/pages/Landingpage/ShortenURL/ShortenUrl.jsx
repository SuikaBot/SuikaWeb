import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

const ShortenUrl = () => {
  const { shortUrl } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_SHORTEN_URL(shortUrl));
        console.log(response);
        window.location.href = response.data.original_url;
      } catch (error) {
        // console.error("Error fetching the original URL:", error);
        navigate(`/r/${shortUrl}`, { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchOriginalUrl();
  }, [shortUrl, navigate]);
};

export default ShortenUrl;
