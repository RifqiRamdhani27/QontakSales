import { useState } from "react";
<<<<<<< HEAD
import { useNavigate, Link as RouterLink, Navigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  VStack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Eye, EyeClosed, Buildings, User, Envelope, Lock } from "@phosphor-icons/react";
=======
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "@phosphor-icons/react";
>>>>>>> repo-nina/main
import api from "@/services/api";
import brandLogo from "@/assets/brand.png";
import LoadingPopup from "@/components/ui/LoadingPopup";

<<<<<<< HEAD
export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirm: "", company_name: "" });
=======
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-[13px] py-3 text-[15px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
    company_name: "",
  });

>>>>>>> repo-nina/main
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

<<<<<<< HEAD
  if (localStorage.getItem("access_token")) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (form.password !== form.password_confirm) { setError("Passwords do not match"); setLoading(false); return; }
    try {
      await api.post("/auth/register/", { name: form.name, email: form.email, password: form.password, company_name: form.company_name });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
=======
  if (localStorage.getItem("access_token")) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.password_confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register/", {
        name: form.name,
        email: form.email,
        password: form.password,
        company_name: form.company_name,
      });

      navigate("/login");
    } catch (err) {
      const data = err.response?.data;

      if (data?.message) {
        setError(data.message);
      } else if (data?.email) {
        setError(Array.isArray(data.email) ? data.email[0] : data.email);
      } else if (data?.detail) {
        setError(data.detail);
      } else {
        setError("Registration failed");
      }
>>>>>>> repo-nina/main
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <Box minH="100vh" display="flex">
      {/* Left Panel - Branding */}
      <Box
        display={{ base: "none", md: "flex" }}
        flex={1}
        bg="primary"
        color="white"
        flexDirection="column"
        justifyContent="center"
        p={12}
        position="relative"
        overflow="hidden"
      >
        <Box position="absolute" bottom={-100} left={-100} w={300} h={300} bg="white" opacity={5} borderRadius="full" />
        <Box position="absolute" top={-50} right={-50} w={200} h={200} bg="white" opacity={5} borderRadius="full" />
        <VStack align="start" gap={8} position="relative" zIndex={1}>
          <Box as="img" src={brandLogo} h="40px" alt="QontakSales" />
          <VStack align="start" gap={4}>
            <Text fontSize="lg" opacity={0.9}>Start closing more deals today.</Text>
            <VStack align="start" gap={3} mt={4}>
              {["Free forever for small teams", "Setup in under 2 minutes", "No credit card required"].map((t) => (
                <HStack key={t} gap={2}>
                  <Box w={2} h={2} borderRadius="full" bg="white" />
                  <Text fontSize="sm" opacity={0.8}>{t}</Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </Box>

      {/* Right Panel - Form */}
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" p={8} bg="background" overflow="auto">
        <Box w="100%" maxW="480px">
          <VStack gap={6}>
            <VStack gap={2} align={{ base: "center", md: "start" }}>
              <Heading size="xl" color="foreground">Create your account</Heading>
              <Text color="foreground" opacity={0.6}>Get started with QontakSales for free</Text>
            </VStack>

            <Box w="100%" bg="white" p={8} borderRadius="2xl" border="1px solid" borderColor="border" shadow="sm">
              <form onSubmit={handleSubmit}>
                <Stack gap={4}>
                  {error && (
                    <Box bg="destructive/10" color="destructive" p={3} borderRadius="md" fontSize="sm" textAlign="center">
                      {error}
                    </Box>
                  )}
                  <Field.Root>
                    <Field.Label>Full Name</Field.Label>
                    <Input name="name" size="lg" value={form.name} onChange={handleChange} placeholder="John Doe" borderRadius="lg" required />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input name="email" type="email" size="lg" value={form.email} onChange={handleChange} placeholder="you@company.com" borderRadius="lg" required />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Company Name</Field.Label>
                    <Input name="company_name" size="lg" value={form.company_name} onChange={handleChange} placeholder="Your Company" borderRadius="lg" required />
                  </Field.Root>
                  <SimpleGrid columns={2} gap={4}>
                    <Field.Root>
                      <Field.Label>Password</Field.Label>
                      <Input name="password" type="password" size="lg" value={form.password} onChange={handleChange} placeholder="Min 8 characters" borderRadius="lg" required />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Confirm</Field.Label>
                      <Input name="password_confirm" type="password" size="lg" value={form.password_confirm} onChange={handleChange} placeholder="Confirm password" borderRadius="lg" required />
                    </Field.Root>
                  </SimpleGrid>
                  <Button
                    type="submit"
                    bg="primary"
                    color="white"
                    size="lg"
                    loading={loading}
                    _hover={{ bg: "secondary", transform: "translateY(-1px)" }}
                    transition="all 200ms ease"
                    borderRadius="lg"
                  >
                    Create Account
                  </Button>
                </Stack>
              </form>
            </Box>

            <Text fontSize="sm" color="foreground" opacity={0.6}>
              Already have an account?{" "}
              <Link as={RouterLink} to="/login" color="primary" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                Sign in
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>

      <LoadingPopup open={loading} message="Creating account..." />
    </Box>
=======
    <div className="flex min-h-screen bg-slate-50">
      <section className="relative hidden flex-1 items-center overflow-hidden bg-brand p-12 text-white md:flex">
        <div className="absolute -bottom-[100px] -left-[100px] h-[300px] w-[300px] rounded-full bg-white opacity-5" />
        <div className="absolute -top-[50px] -right-[50px] h-[200px] w-[200px] rounded-full bg-white opacity-5" />

        <div className="relative z-[2] max-w-[500px]">
          <img
            src={brandLogo}
            alt="QontakSales"
            className="mb-[55px] h-10 w-auto object-contain"
          />

          <h2 className="m-0 mb-7 text-[28px] font-bold leading-[1.3]">
            Start closing more deals today.
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
              <p className="m-0 text-[15px] opacity-90">
                Free forever for small teams
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
              <p className="m-0 text-[15px] opacity-90">
                Setup in under 2 minutes
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
              <p className="m-0 text-[15px] opacity-90">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center overflow-y-auto p-10 max-md:p-6">
        <div className="w-full max-w-[480px]">
          <div className="mb-6">
            <h1 className="m-0 text-[30px] font-bold text-slate-900 max-md:text-[26px]">
              Create your account
            </h1>
            <p className="m-0 mt-2 text-[15px] text-slate-500">
              Get started with QontakSales for free
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-[30px] shadow-[0_4px_20px_rgba(15,23,42,0.06)] max-md:p-[22px]">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-[18px] rounded-lg border border-red-200 bg-red-50 px-[13px] py-[11px] text-center text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="mb-[18px] flex flex-col gap-[7px]">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className={inputClass}
                />
              </div>

              <div className="mb-[18px] flex flex-col gap-[7px]">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  className={inputClass}
                />
              </div>

              <div className="mb-[18px] flex flex-col gap-[7px]">
                <label htmlFor="company_name" className="text-sm font-semibold text-slate-700">
                  Company Name
                </label>
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  value={form.company_name}
                  onChange={handleChange}
                  placeholder="Your Company"
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5 max-md:grid-cols-1 max-md:gap-0">
                <div className="mb-[18px] flex flex-col gap-[7px]">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min 8 characters"
                      required
                      className={`${inputClass} pr-11`}
                    />

                    <button
                      type="button"
                      className="absolute top-1/2 right-2.5 flex -translate-y-1/2 cursor-pointer items-center justify-center border-0 bg-transparent text-slate-500 hover:text-brand"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeClosed size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mb-[18px] flex flex-col gap-[7px]">
                  <label htmlFor="password_confirm" className="text-sm font-semibold text-slate-700">
                    Confirm
                  </label>

                  <input
                    id="password_confirm"
                    name="password_confirm"
                    type={showPassword ? "text" : "password"}
                    value={form.password_confirm}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg border-0 bg-brand px-4 py-[13px] text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          </div>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <RouterLink to="/login" className="font-semibold text-brand no-underline hover:underline">
              Sign in
            </RouterLink>
          </p>
        </div>
      </section>

      <LoadingPopup
        open={loading}
        message="Creating account..."
      />
    </div>
>>>>>>> repo-nina/main
  );
}
