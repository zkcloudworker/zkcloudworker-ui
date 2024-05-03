<script lang="ts">
	import EvidenceField from './EvidenceField.svelte';
	import { Alert } from 'flowbite-svelte';
	import { createForm } from 'felte';
	import { object, string } from 'yup';
	export let eform: any, data: any; // this is the data for this MasterPlan and empty Claim

	function camelize(str: string) {
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, '');
	}

	interface IField {
		name: string;
		label: string;
		initialValue: any;
		schemaType: any;
		type: string;
		required: boolean;
		sid: string;
		description: string;
		extras: any;
	}

	const fields = eform.map((field: any) => ({
		name: camelize(field.type + '_' + field.label),
		sid: field.sid && field.sid !== '' ? field.sid : camelize(field.type + '_' + field.label),
		initialValue: '',
		schemaType: field.required ? string().required(field.label + " is required") : string(),
		description: field.description,
		extras: field.extras,
		label: field.label,
		type: field.type,
		required: field.required
	}));

	const schemaObject = Object.fromEntries(
		fields.map((field: IField) => [field.name, field.schemaType])
	);

	const schema = object().shape(schemaObject);

	const { form, errors, isValid, touched, createSubmitHandler } = createForm({
		validate: async (values) => {
			try {
				console.log('validating');
				await schema.validate(values, { abortEarly: false });
			} catch (err: any) {
				const errors = err.inner.reduce(
					(res: any, value: any) => ({
						[value.path]: value.message,
						...res
					}),
					{}
				);
				return errors;
			}
		}
	});
</script>

<div class="">
	<Alert
		dismissable
		class="-mx-4 mb-8 rounded-lg bg-gray-200 px-4 pb-3 pt-4 text-sm leading-relaxed text-blue-900"
	>
		Please provide below the required evidence to sustain your claim. This evidence will be deleted
		as soon as the claim has been approved, so no personal or private data will be stored and kept.
	</Alert>

	<form use:form on:submit|stopPropagation|preventDefault class="mx-10 flex flex-col space-y-4">
		{#each fields || [] as field, index}
			<EvidenceField {errors} {touched} {field} {index} bind:data />
		{/each}
	</form>
</div>
