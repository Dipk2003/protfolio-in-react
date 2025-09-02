import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import CodeDemo from "../components/CodeDemo";

gsap.registerPlugin(ScrollTrigger);

const InteractiveCoding = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".coding-section",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".interactive-coding-container",
          start: "top 80%",
        },
      }
    );
  });

  const codeDemos = [
    {
      title: "Java Spring Boot REST API",
      description: "User authentication with JWT tokens",
      language: "java",
      initialCode: `@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(
        @RequestBody LoginRequest loginRequest) {
        
        try {
            Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()));
            
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            return ResponseEntity.ok(new JwtResponse(jwt));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Authentication failed!");
        }
    }
}`,
      output: "🚀 JWT Token Generated Successfully!\n✅ User authenticated\n📝 Token: eyJhbGciOiJIUzI1NiJ9..."
    },
    {
      title: "React Voting Component",
      description: "Real-time voting system with state management",
      language: "javascript",
      initialCode: `import React, { useState, useEffect } from 'react';

const VotingComponent = () => {
  const [votes, setVotes] = useState({
    candidate1: 0,
    candidate2: 0,
    candidate3: 0
  });
  
  const [hasVoted, setHasVoted] = useState(false);
  
  const handleVote = (candidate) => {
    if (!hasVoted) {
      setVotes(prev => ({
        ...prev,
        [candidate]: prev[candidate] + 1
      }));
      setHasVoted(true);
    }
  };
  
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  
  return (
    <div className="voting-container">
      <h2>Real-Time Voting System</h2>
      {Object.entries(votes).map(([candidate, count]) => (
        <div key={candidate} className="candidate">
          <button 
            onClick={() => handleVote(candidate)}
            disabled={hasVoted}
          >
            Vote for {candidate}
          </button>
          <div className="vote-count">
            {count} votes ({totalVotes > 0 ? Math.round((count/totalVotes)*100) : 0}%)
          </div>
        </div>
      ))}
    </div>
  );
};

export default VotingComponent;`,
      output: "🗳️ Voting System Initialized\n✅ Real-time vote counting active\n📊 WebSocket connection established\n🔄 State management working"
    },
    {
      title: "File Encryption Algorithm",
      description: "AES-256 encryption implementation",
      language: "java",
      initialCode: `import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class FileEncryption {
    
    private static final String ALGORITHM = "AES";
    private static final String TRANSFORMATION = "AES/ECB/PKCS5Padding";
    
    public static String encrypt(String data, String key) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(
            key.getBytes(), ALGORITHM);
        
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        
        byte[] encryptedData = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedData);
    }
    
    public static String decrypt(String encryptedData, String key) 
        throws Exception {
        
        SecretKeySpec secretKey = new SecretKeySpec(
            key.getBytes(), ALGORITHM);
        
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        
        byte[] decodedData = Base64.getDecoder()
            .decode(encryptedData);
        byte[] decryptedData = cipher.doFinal(decodedData);
        
        return new String(decryptedData);
    }
}`,
      output: "🔐 AES-256 Encryption Ready\n✅ Secret key generated\n🔒 File encrypted successfully\n🗝️ Decryption test passed"
    }
  ];

  return (
    <section id="coding" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 interactive-coding-container">
        <TitleHeader
          title="Interactive Code Demonstrations"
          sub="💻 Live coding examples showcasing my programming skills"
        />
        
        <div className="coding-section mt-16">
          <div className="grid gap-8">
            {codeDemos.map((demo, index) => (
              <CodeDemo
                key={index}
                title={demo.title}
                description={demo.description}
                initialCode={demo.initialCode}
                language={demo.language}
                output={demo.output}
              />
            ))}
          </div>
          
          {/* Coding Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="card-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">⌨️</div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-white-50">Hours Coded</div>
            </div>
            <div className="card-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🐛</div>
              <div className="text-2xl font-bold">100+</div>
              <div className="text-white-50">Bugs Fixed</div>
            </div>
            <div className="card-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">☕</div>
              <div className="text-2xl font-bold">200+</div>
              <div className="text-white-50">Cups of Coffee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCoding;
