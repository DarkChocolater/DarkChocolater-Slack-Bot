import { Persona } from "./base-persona/base-persona.dto";
import { slackSoftwareEngPersona } from "./slack-software-eng/slack-software-eng.persona";

const personas = [slackSoftwareEngPersona];

export function getPersonaByConfigName(configName: string): Persona {
  const persona = personas.find((p) => p.configName === configName)