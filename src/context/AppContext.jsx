import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/app";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [tools, setTools] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Currently only services API is available
      // You can add more APIs here as they become available
      const [
        servicesRes,
        // toolsRes,
        // blogsRes,
        // faqRes,
        // testimonialRes,
      ] = await Promise.all([
        api.get('/services'),
        // api.get('/tools'),
        // api.get('/blogs'),
        // api.get('/faqs'),
        // api.get('/testimonials'),
      ]);

      // Set services data
      if (servicesRes.data.status && servicesRes.data.data) {
        setServices(servicesRes.data.data);
      }

      // Uncomment these when APIs are available
      // if (toolsRes.data.status && toolsRes.data.data) {
      //   setTools(toolsRes.data.data);
      // }
      // if (blogsRes.data.status && blogsRes.data.data) {
      //   setBlogs(blogsRes.data.data);
      // }
      // if (faqRes.data.status && faqRes.data.data) {
      //   setFaqs(faqRes.data.data);
      // }
      // if (testimonialRes.data.status && testimonialRes.data.data) {
      //   setTestimonials(testimonialRes.data.data);
      // }

    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

 

  

  const value = {
    services,
    tools,
    blogs,
    faqs,
    testimonials,
    loading,
    error,
   
    refetchData: fetchInitialData, // Allow manual refetch if needed
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
};