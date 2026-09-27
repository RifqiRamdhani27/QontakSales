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
  Icon,
} from "@chakra-ui/react";
import { Eye, EyeClosed, Lightning, ChartLineUp, Kanban } from "@phosphor-icons/react";
=======
import { useNavigate, Navigate, Link as RouterLink } from "react-router-dom";
import {
  Eye,
  EyeClosed,
  Lightning,
  ChartLineUp,
  Kanban,
} from "@phosphor-icons/react";

>>>>>>> repo-nina/main
import api from "@/services/api";
import brandLogo from "@/assets/brand.png";
import LoadingPopup from "@/components/ui/LoadingPopup";

<<<<<<< HEAD
export default function LoginPage() {
  const navigate = useNavigate();
=======
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-[13px] text-[15px] text-slate-900 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-slate-400 focus:border-brand focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]";

const featureClass =
  "flex items-center justify-center rounded-[10px] bg-white/20 p-3";

const featureTitleClass = "mb-0.5 text-base font-semibold";
const featureDescClass = "text-sm opacity-80";

export default function LoginPage() {
  const navigate = useNavigate();

>>>>>>> repo-nina/main
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

<<<<<<< HEAD
  if (localStorage.getItem("access_token")) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/token/", { email, password });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      const profile = await api.get("/auth/profile/");
      localStorage.setItem("user_role", profile.data.role);
      localStorage.setItem("user_name", `${profile.data.first_name} ${profile.data.last_name}`);
=======
  if (localStorage.getItem("access_token")) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/token/", {
        email,
        password,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      const profile = await api.get("/auth/profile/");

      localStorage.setItem("user_role", profile.data.role);
      localStorage.setItem(
        "user_name",
        `${profile.data.first_name} ${profile.data.last_name}`
      );

>>>>>>> repo-nina/main
      localStorage.removeItem("manager_token");
      localStorage.removeItem("manager_refresh");
      localStorage.removeItem("manager_user");
      localStorage.removeItem("impersonating");
      localStorage.removeItem("impersonated_name");
<<<<<<< HEAD
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.detail || err.response?.data?.error || "Invalid email or password";
=======

      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Invalid email or password";

>>>>>>> repo-nina/main
      setError(msg);
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
        <Box position="absolute" top={0} left={0} right={0} bottom={0} opacity={0.1}>
          <Kanban size={400} weight="light" style={{ position: "absolute", top: -50, right: -50 }} />
        </Box>
        <VStack align="start" gap={8} position="relative" zIndex={1}>
          <Box as="img" src={brandLogo} h="40px" alt="QontakSales" />
          <VStack align="start" gap={6}>
            <HStack gap={4}>
              <Box bg="white/20" p={3} borderRadius="lg"><ChartLineUp size={24} /></Box>
              <VStack align="start" gap={0}>
                <Text fontWeight="semibold">Track Performance</Text>
                <Text fontSize="sm" opacity={0.8}>Real-time analytics & reports</Text>
              </VStack>
            </HStack>
            <HStack gap={4}>
              <Box bg="white/20" p={3} borderRadius="lg"><Kanban size={24} /></Box>
              <VStack align="start" gap={0}>
                <Text fontWeight="semibold">Manage Pipeline</Text>
                <Text fontSize="sm" opacity={0.8}>Visual Kanban board</Text>
              </VStack>
            </HStack>
            <HStack gap={4}>
              <Box bg="white/20" p={3} borderRadius="lg"><Lightning size={24} /></Box>
              <VStack align="start" gap={0}>
                <Text fontWeight="semibold">Close Faster</Text>
                <Text fontSize="sm" opacity={0.8}>Boost your sales velocity</Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      {/* Right Panel - Form */}
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" p={8} bg="background">
        <Box w="100%" maxW="400px">
          <VStack gap={8}>
            <VStack gap={3} align={{ base: "center", md: "start" }}>
              <Heading size="xl" color="foreground">Welcome back</Heading>
              <Text color="foreground" opacity={0.6}>Sign in to your account to continue</Text>
            </VStack>

            <Box w="100%" bg="white" p={8} borderRadius="2xl" border="1px solid" borderColor="border" shadow="sm">
              <form onSubmit={handleSubmit}>
                <Stack gap={5}>
                  {error && (
                    <Box bg="destructive/10" color="destructive" p={3} borderRadius="md" fontSize="sm" textAlign="center">
                      {error}
                    </Box>
                  )}
                  <Field.Root>
                    <Field.Label color="foreground">Email</Field.Label>
                    <Input
                      size="lg"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      borderRadius="lg"
                      required
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color="foreground">Password</Field.Label>
                    <Box position="relative" w="full">
                      <Input
                        size="lg"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        borderRadius="lg"
                        w="full"
                        pr={12}
                        required
                      />
                      <Box
                        position="absolute"
                        right={4}
                        top="50%"
                        transform="translateY(-50%)"
                        cursor="pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        color="foreground"
                        opacity={0.5}
                        _hover={{ opacity: 1 }}
                        display="flex"
                        alignItems="center"
                      >
                        {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                      </Box>
                    </Box>
                  </Field.Root>
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
                    Sign In
                  </Button>
                </Stack>
              </form>
            </Box>

            <Text fontSize="sm" color="foreground" opacity={0.6}>
              Don't have an account?{" "}
              <Link as={RouterLink} to="/register" color="primary" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                Sign up for free
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>

      <LoadingPopup open={loading} message="Signing in..." />
    </Box>
=======
    <div className="flex min-h-screen bg-slate-50 max-md:block">

      <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-brand p-12 text-white max-md:hidden">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-end opacity-10">
          <Kanban size={400} weight="light" className="absolute -top-[50px] -right-[50px]" />
        </div>

        <div className="relative z-[1]">
          <img
            src={brandLogo}
            alt="QontakSales"
            className="mb-12 h-10 w-auto object-contain"
          />

          <div className="flex flex-col gap-8">

            <div className="flex items-center gap-4">
              <div className={featureClass}>
                <ChartLineUp size={24} />
              </div>

              <div>
                <div className={featureTitleClass}>
                  Track Performance
                </div>

                <div className={featureDescClass}>
                  Real-time analytics &amp; reports
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={featureClass}>
                <Kanban size={24} />
              </div>

              <div>
                <div className={featureTitleClass}>
                  Manage Pipeline
                </div>

                <div className={featureDescClass}>
                  Visual Kanban board
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={featureClass}>
                <Lightning size={24} />
              </div>

              <div>
                <div className={featureTitleClass}>
                  Close Faster
                </div>

                <div className={featureDescClass}>
                  Boost your sales velocity
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-slate-50 p-8 max-md:min-h-screen max-md:p-6">
        <div className="w-full max-w-[400px] max-md:max-w-[420px]">

          <div className="mb-8 text-left max-md:text-center">
            <h1 className="mb-3 text-[32px] font-bold leading-[1.2] text-slate-900 max-md:text-[28px]">
              Welcome back
            </h1>
            <p className="m-0 text-[15px] text-slate-500">
              Sign in to your account to continue
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_4px_12px_rgba(15,23,42,0.05)] max-md:p-6">

            <form onSubmit={handleSubmit}>

              <div className="flex flex-col gap-5">

                {error && (
                  <div className="rounded-lg border border-red-600/15 bg-red-600/[0.08] p-3 text-center text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-2">

                  <label htmlFor="email" className="text-sm font-medium text-slate-900">
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={inputClass}
                  />

                </div>

                <div className="flex flex-col gap-2">

                  <label htmlFor="password" className="text-sm font-medium text-slate-900">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className={`${inputClass} pr-12`}
                    />

                    <button
                      type="button"
                      className="absolute top-1/2 right-3 flex -translate-y-1/2 cursor-pointer items-center justify-center bg-transparent p-1 text-slate-500 hover:text-slate-900"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeClosed size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>

                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-brand px-4 py-[13px] text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

              </div>

            </form>

          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <RouterLink to="/register" className="font-semibold text-brand no-underline hover:underline">
              Sign up for free
            </RouterLink>
          </div>

        </div>
      </div>

      <LoadingPopup
        open={loading}
        message="Signing in..."
      />

    </div>
>>>>>>> repo-nina/main
  );
}
