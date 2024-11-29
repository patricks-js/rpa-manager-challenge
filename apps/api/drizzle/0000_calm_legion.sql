CREATE TABLE `rpa` (
	`id` integer PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`cpf` text NOT NULL,
	`data_nascimento` text NOT NULL,
	`estado_civil` text,
	`identidade_numero` text NOT NULL,
	`orgao_emissor` text NOT NULL,
	`estado_emissor` text NOT NULL,
	`numero_dependentes` integer,
	`nacionalidade` text NOT NULL,
	`cep` text NOT NULL,
	`rua` text NOT NULL,
	`numero` text NOT NULL,
	`complemento` text NOT NULL,
	`bairro` text NOT NULL,
	`estado` text NOT NULL,
	`municipio` text NOT NULL,
	`telefone` text NOT NULL,
	`email` text NOT NULL,
	`numeroContribuinte` text NOT NULL,
	`categoriaAutonomo` text NOT NULL,
	`cboAutonomo` text NOT NULL,
	`codigoReceita` text NOT NULL,
	`nit` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rpa_cpf_unique` ON `rpa` (`cpf`);--> statement-breakpoint
CREATE UNIQUE INDEX `rpa_email_unique` ON `rpa` (`email`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`usuario` text NOT NULL,
	`senha` text NOT NULL,
	`nome_coligada` text NOT NULL,
	`nome_filial` text NOT NULL,
	`email` text NOT NULL,
	`nome_completo` text NOT NULL,
	`telefone` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);