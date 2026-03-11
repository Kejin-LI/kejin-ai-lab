-- This script updates the projects table with the correct data
-- Run this in your Supabase SQL Editor

-- First, clear existing projects
TRUNCATE TABLE public.projects CASCADE;

-- Insert the correct projects
INSERT INTO public.projects (title, description, content, technologies, image_url) VALUES
(
  'Tracing Journey: AI Museum Guide', 
  'An AI-native design app that combines smart photo explanations, itinerary planning, and travel journals to make global museum visits easy and fun.', 
  '# Tracing Journey: AI Museum Guide\n\nAn AI-native design app that combines smart photo explanations, itinerary planning, and travel journals to make global museum visits easy and fun.', 
  ARRAY['AI Native', 'Photo Recognition', 'Smart Guide'], 
  'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20a%20cute%20explorer%20character%20in%20a%20museum%20using%20an%20ai%20guide%20app%20with%20holographic%20artifacts%20ancient%20vases%20and%20paintings%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20minimalist%20clean%20background%20high%20quality&image_size=landscape_16_9'
),
(
  'PM Chest: The Ultimate Toolkit', 
  'An AI-powered assistant for product managers to clarify requirements, write PRDs, generate UI designs, and create interactive demos.', 
  '# PM Chest: The Ultimate Toolkit\n\nAn AI-powered assistant for product managers to clarify requirements, write PRDs, generate UI designs, and create interactive demos.', 
  ARRAY['Requirement Analysis', 'PRD Gen', 'UI/UX'], 
  'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20a%20magical%20treasure%20chest%20overflowing%20with%20glowing%20digital%20tools%20documents%20and%20ui%20prototypes%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20minimalist%20clean%20background%20high%20quality%20cute%20style&image_size=landscape_16_9'
),
(
  'Annotation Expert Recruitment Platform', 
  'Link AI data demanders with top domain annotation experts efficiently.', 
  '# Annotation Expert Recruitment Platform\n\nLink AI data demanders with top domain annotation experts efficiently.', 
  ARRAY['Experts', 'AI Interview'], 
  'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3d%20illustration%20of%20friendly%20expert%20characters%20connecting%20with%20glowing%20ai%20neural%20networks%20and%20data%20nodes%20macaron%20pastel%20colors%20blue%20pink%20yellow%20theme%20futuristic%20tech%20elements%20clean%20background%20high%20quality%20minimalist&image_size=landscape_16_9'
);
