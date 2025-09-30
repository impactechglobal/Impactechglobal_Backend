import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Shield, Key, Lock, Unlock, RefreshCw, Download, Upload } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mockKeys = [
  { id: "KEY001", name: "Database Encryption", algorithm: "AES-256", status: "Active", created: "2024-01-10", expires: "2025-01-10" },
  { id: "KEY002", name: "File System Key", algorithm: "RSA-4096", status: "Active", created: "2024-01-08", expires: "2025-01-08" },
  { id: "KEY003", name: "Communication Key", algorithm: "ECC-P384", status: "Rotating", created: "2024-01-15", expires: "2025-01-15" },
  { id: "KEY004", name: "Backup Encryption", algorithm: "AES-256", status: "Inactive", created: "2024-01-05", expires: "2025-01-05" },
];

const mockCertificates = [
  { name: "SSL Certificate", issuer: "Let's Encrypt", status: "Valid", expires: "2024-04-15", domains: 3 },
  { name: "Code Signing", issuer: "DigiCert", status: "Valid", expires: "2024-06-20", domains: 1 },
  { name: "Client Certificate", issuer: "Internal CA", status: "Expiring", expires: "2024-02-01", domains: 2 },
];

export default function Encryption() {
  const [autoRotation, setAutoRotation] = useState(true);
  const [encryptionText, setEncryptionText] = useState("");
  const [isGenerateKeyOpen, setIsGenerateKeyOpen] = useState(false);
  const { toast } = useToast();

  const handleGenerateKey = () => { setIsGenerateKeyOpen(false); toast({ title: "Key Generated", description: "New encryption key has been generated and activated." }); };
  const handleRotateKey = (keyId: string) => { toast({ title: "Key Rotation Started", description: `Encryption key ${keyId} is being rotated.` }); };
  const handleRevokeKey = (keyId: string) => { toast({ title: "Key Revoked", description: `Encryption key ${keyId} has been revoked.`, variant: "destructive" }); };
  const handleEncrypt = () => { encryptionText.trim() && toast({ title: "Text Encrypted", description: "Your text has been encrypted successfully." }); };
  const handleDecrypt = () => { encryptionText.trim() && toast({ title: "Text Decrypted", description: "Your text has been decrypted successfully." }); };
  const handleUploadFile = () => { toast({ title: "File Upload", description: "File encryption upload initiated." }); };
  const handleDownloadFile = () => { toast({ title: "File Download", description: "Encrypted file download started." }); };
  const handleRenewCertificate = (certName: string) => { toast({ title: "Certificate Renewal", description: `Certificate ${certName} renewal process started.` }); };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": case "Valid": return "bg-success/20 text-success border-success/30";
      case "Rotating": return "bg-warning/20 text-warning border-warning/30";
      case "Inactive": case "Expiring": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Encryption Management</h1>
          <p className="text-muted-foreground">Manage encryption keys, certificates, and cryptographic operations</p>
        </div>
        <Dialog open={isGenerateKeyOpen} onOpenChange={setIsGenerateKeyOpen}>
          <DialogTrigger asChild>
            <GradientButton size="default" className="w-full sm:w-auto">
              <Key className="w-4 h-4 mr-2" />
              Generate Key
            </GradientButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Encryption Key</DialogTitle>
              <DialogDescription>Create a new encryption key with specified algorithm and key length for secure data protection.</DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <Button variant="outline" onClick={() => setIsGenerateKeyOpen(false)}>Cancel</Button>
              <Button onClick={handleGenerateKey}><Key className="w-4 h-4 mr-2" />Generate Key</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Active Keys", value: "12", color: "text-success", subtitle: "Currently in use" },
          { title: "Encrypted Data", value: "2.4 TB", color: "text-accent-orange", subtitle: "Protected storage" },
          { title: "Certificates", value: "8", color: "text-foreground", subtitle: "Valid certificates" },
          { title: "Key Rotations", value: "3", color: "text-warning", subtitle: "This month" },
        ].map((card, idx) => (
          <Card key={idx} className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
              <div className="text-sm text-muted-foreground">{card.subtitle}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Keys & Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Encryption Keys */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-accent-orange" />Encryption Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockKeys.map((key) => (
              <div key={key.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2 sm:gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Shield className="w-8 h-8 text-accent-orange" />
                  <div className="truncate">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-foreground truncate">{key.name}</span>
                      <Badge className={getStatusColor(key.status)}>{key.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">{key.algorithm} • Created: {key.created}</div>
                    <div className="text-xs text-muted-foreground truncate">Expires: {key.expires}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" onClick={() => handleRotateKey(key.id)} className="w-full sm:w-auto"><RefreshCw className="w-4 h-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => handleRevokeKey(key.id)} className="text-destructive hover:text-destructive w-full sm:w-auto">Revoke</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Encryption Tools */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent-orange" />Encryption Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter text or paste encrypted data..."
              value={encryptionText}
              onChange={(e) => setEncryptionText(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleEncrypt} className="flex-1 flex justify-center gap-2"><Lock className="w-4 h-4" />Encrypt</Button>
              <Button onClick={handleDecrypt} variant="outline" className="flex-1 flex justify-center gap-2"><Unlock className="w-4 h-4" />Decrypt</Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex-1 flex justify-center gap-2" onClick={handleUploadFile}><Upload className="w-4 h-4" />Upload File</Button>
              <Button variant="outline" className="flex-1 flex justify-center gap-2" onClick={handleDownloadFile}><Download className="w-4 h-4" />Download</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Certificates */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent-orange" />Certificates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCertificates.map((cert, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2 sm:gap-4">
                <div className="truncate">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-foreground truncate">{cert.name}</span>
                    <Badge className={getStatusColor(cert.status)}>{cert.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">Issuer: {cert.issuer} • {cert.domains} domains</div>
                  <div className="text-xs text-muted-foreground truncate">Expires: {cert.expires}</div>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => handleRenewCertificate(cert.name)}>Renew</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-accent-orange" />Encryption Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Auto Key Rotation", desc: "Automatically rotate keys periodically", state: autoRotation, setState: setAutoRotation },
              { label: "Hardware Security Module", desc: "Use HSM for key storage", state: true, setState: () => {} },
              { label: "Perfect Forward Secrecy", desc: "Generate unique session keys", state: true, setState: () => {} },
              { label: "Quantum-Safe Algorithms", desc: "Use post-quantum cryptography", state: false, setState: () => {} },
            ].map((setting, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="font-medium text-foreground">{setting.label}</span>
                  <p className="text-sm text-muted-foreground">{setting.desc}</p>
                </div>
                <Switch checked={setting.state} onCheckedChange={setting.setState} className="self-start sm:self-auto" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
