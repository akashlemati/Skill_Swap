package com.skillswap.config;

import com.skillswap.entity.*;
import com.skillswap.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;
    private final LearningSkillRepository learningSkillRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(SkillRepository skillRepository,
                           UserRepository userRepository,
                           UserSkillRepository userSkillRepository,
                           LearningSkillRepository learningSkillRepository,
                           PasswordEncoder passwordEncoder) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
        this.learningSkillRepository = learningSkillRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (skillRepository.count() > 0) {
            return; // Already initialized
        }

        System.out.println(">>> [SkillSwap] Initializing platform default skills and demo peer accounts...");

        // 1. Seed Skills
        Map<String, Skill> skills = new HashMap<>();

        // Programming
        skills.put("Java", skillRepository.save(new Skill("Java", "Core Java, OOP, Collections, Concurrency & Stream APIs", SkillCategory.PROGRAMMING)));
        skills.put("Spring Boot", skillRepository.save(new Skill("Spring Boot", "REST APIs, Spring Data JPA, Microservices & Security", SkillCategory.PROGRAMMING)));
        skills.put("Python", skillRepository.save(new Skill("Python", "Python 3 scripting, automation, algorithms & backend", SkillCategory.PROGRAMMING)));
        skills.put("C++", skillRepository.save(new Skill("C++", "C++ 20 modern algorithms, memory management & STL", SkillCategory.PROGRAMMING)));

        // Web Development
        skills.put("React", skillRepository.save(new Skill("React", "React 19 hooks, component architecture, state management", SkillCategory.WEB_DEVELOPMENT)));
        skills.put("Tailwind CSS", skillRepository.save(new Skill("Tailwind CSS", "Utility-first responsive layouts, flexbox and grid styling", SkillCategory.WEB_DEVELOPMENT)));
        skills.put("TypeScript", skillRepository.save(new Skill("TypeScript", "Static typing, generics, interfaces & modern JS tooling", SkillCategory.WEB_DEVELOPMENT)));
        skills.put("Next.js", skillRepository.save(new Skill("Next.js", "Server side rendering, app router & full-stack web apps", SkillCategory.WEB_DEVELOPMENT)));

        // Data Science
        skills.put("SQL", skillRepository.save(new Skill("SQL", "Relational databases, indexing, joins and optimization", SkillCategory.DATA_SCIENCE)));
        skills.put("Machine Learning", skillRepository.save(new Skill("Machine Learning", "Supervised models, regression, scikit-learn & PyTorch", SkillCategory.DATA_SCIENCE)));
        skills.put("Pandas", skillRepository.save(new Skill("Pandas", "Data transformation, cleaning, feature engineering", SkillCategory.DATA_SCIENCE)));

        // Design
        skills.put("Figma", skillRepository.save(new Skill("Figma", "UI/UX component systems, wireframing, interactive prototypes", SkillCategory.DESIGN)));
        skills.put("UI/UX Design", skillRepository.save(new Skill("UI/UX Design", "User research, heuristics, design thinking & usability", SkillCategory.DESIGN)));

        // Languages
        skills.put("Spanish", skillRepository.save(new Skill("Spanish", "Conversational fluency, grammar, pronunciation & idioms", SkillCategory.LANGUAGES)));
        skills.put("Japanese", skillRepository.save(new Skill("Japanese", "Hiragana, Katakana, basic Kanji & conversational practice", SkillCategory.LANGUAGES)));

        // Music
        skills.put("Acoustic Guitar", skillRepository.save(new Skill("Acoustic Guitar", "Chords, fingerpicking, rhythm techniques & songs", SkillCategory.MUSIC)));
        skills.put("Music Theory", skillRepository.save(new Skill("Music Theory", "Scales, harmony, chord progressions & ear training", SkillCategory.MUSIC)));

        // Business
        skills.put("Product Strategy", skillRepository.save(new Skill("Product Strategy", "Product-market fit, roadmapping, KPI tracking & metrics", SkillCategory.BUSINESS)));
        skills.put("Public Speaking", skillRepository.save(new Skill("Public Speaking", "Confidence, slide deck delivery & pitch presentation", SkillCategory.BUSINESS)));

        // 2. Seed Demo Users
        String encodedPassword = passwordEncoder.encode("password123");

        // Primary Demo User (matches Alex Johnson in frontend)
        User alex = new User();
        alex.setName("Alex Johnson");
        alex.setEmail("alex.johnson@skillswap.io");
        alex.setPassword(encodedPassword);
        alex.setTitle("Backend Software Engineer");
        alex.setLocation("San Francisco, CA");
        alex.setBio("Senior Java & Spring Boot engineer eager to learn modern React 19 and UI/UX design in return. Passionate about clean code, mentoring, and continuous learning.");
        alex.setProfileImage("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400");
        alex.setRole(Role.USER);
        alex = userRepository.save(alex);

        // David Kim (React specialist who wants Java - 96% Match with Alex!)
        User david = new User();
        david.setName("David Kim");
        david.setEmail("david.kim@skillswap.io");
        david.setPassword(encodedPassword);
        david.setTitle("Frontend Lead & React Specialist");
        david.setLocation("Toronto, Canada");
        david.setBio("React and TypeScript wizard. Looking for a patient peer to teach me Java architecture patterns and MySQL database indexing.");
        david.setProfileImage("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400");
        david.setRole(Role.USER);
        david = userRepository.save(david);

        // Elena Rostova (Figma designer who wants SQL - 91% Match with Alex!)
        User elena = new User();
        elena.setName("Elena Rostova");
        elena.setEmail("elena.rostova@skillswap.io");
        elena.setPassword(encodedPassword);
        elena.setTitle("Product Designer & UX Researcher");
        elena.setLocation("Berlin, Germany");
        elena.setBio("Lead product designer with 6+ years creating scalable design systems in Figma. Seeking to understand backend REST APIs and SQL fundamentals.");
        elena.setProfileImage("https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400");
        elena.setRole(Role.USER);
        elena = userRepository.save(elena);

        // Priya Sharma (ML Data Scientist who wants Guitar)
        User priya = new User();
        priya.setName("Priya Sharma");
        priya.setEmail("priya.sharma@skillswap.io");
        priya.setPassword(encodedPassword);
        priya.setTitle("Data Scientist & ML Researcher");
        priya.setLocation("Seattle, WA");
        priya.setBio("Building statistical models and deep learning pipelines. Want to learn guitar chord transitions and sound recording basics.");
        priya.setProfileImage("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400");
        priya.setRole(Role.USER);
        priya = userRepository.save(priya);

        // 3. Assign Reciprocal Skills
        // Alex Teaches: Java, Spring Boot
        userSkillRepository.save(new UserSkill(alex, skills.get("Java"), SkillLevel.ADVANCED));
        userSkillRepository.save(new UserSkill(alex, skills.get("Spring Boot"), SkillLevel.ADVANCED));
        // Alex Wants: React, UI/UX Design, Figma
        learningSkillRepository.save(new LearningSkill(alex, skills.get("React"), SkillLevel.BEGINNER));
        learningSkillRepository.save(new LearningSkill(alex, skills.get("UI/UX Design"), SkillLevel.BEGINNER));
        learningSkillRepository.save(new LearningSkill(alex, skills.get("Figma"), SkillLevel.BEGINNER));

        // David Teaches: React, TypeScript, Tailwind CSS
        userSkillRepository.save(new UserSkill(david, skills.get("React"), SkillLevel.EXPERT));
        userSkillRepository.save(new UserSkill(david, skills.get("TypeScript"), SkillLevel.ADVANCED));
        userSkillRepository.save(new UserSkill(david, skills.get("Tailwind CSS"), SkillLevel.ADVANCED));
        // David Wants: Java, Spring Boot
        learningSkillRepository.save(new LearningSkill(david, skills.get("Java"), SkillLevel.BEGINNER));
        learningSkillRepository.save(new LearningSkill(david, skills.get("Spring Boot"), SkillLevel.BEGINNER));

        // Elena Teaches: Figma, UI/UX Design
        userSkillRepository.save(new UserSkill(elena, skills.get("Figma"), SkillLevel.EXPERT));
        userSkillRepository.save(new UserSkill(elena, skills.get("UI/UX Design"), SkillLevel.EXPERT));
        // Elena Wants: SQL, Spring Boot
        learningSkillRepository.save(new LearningSkill(elena, skills.get("SQL"), SkillLevel.BEGINNER));
        learningSkillRepository.save(new LearningSkill(elena, skills.get("Spring Boot"), SkillLevel.BEGINNER));

        // Priya Teaches: Machine Learning, Python, Pandas
        userSkillRepository.save(new UserSkill(priya, skills.get("Machine Learning"), SkillLevel.ADVANCED));
        userSkillRepository.save(new UserSkill(priya, skills.get("Python"), SkillLevel.ADVANCED));
        // Priya Wants: Acoustic Guitar, Music Theory
        learningSkillRepository.save(new LearningSkill(priya, skills.get("Acoustic Guitar"), SkillLevel.BEGINNER));
        learningSkillRepository.save(new LearningSkill(priya, skills.get("Music Theory"), SkillLevel.BEGINNER));

        System.out.println(">>> [SkillSwap] Data initialization completed successfully!");
    }
}
