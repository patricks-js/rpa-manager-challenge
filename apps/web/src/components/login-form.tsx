import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

async function signIn({ username, password }: FormSchema) {
  const response = await api.login.$post({
    json: {
      username,
      password,
    },
  });

  if (response.status === 401) {
    const error = await response.json();
    throw new Error(error.message);
  }

  if (response.status === 400) {
    const error = await response.json();
    throw new Error(error.message);
  }

  if (response.status === 500) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();

  return data;
}

export function LoginForm() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(`Erro ao entrar: ${error.message}`);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    const data = await mutation.mutateAsync(values);

    console.log(data.token);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input
                  placeholder="Seu usuário"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {mutation.isPending ? "Entrando..." : "Entrar"}
          Entrar
        </Button>
      </form>
    </Form>
  );
}
