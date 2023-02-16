package br.gov.lexml.editoremendas;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class LandingPageMailServiceImpl implements LandingPageMailService {
    private final JavaMailSender mailSender;

    public LandingPageMailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(MensagemLandingPage message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom("ls_sesap@senado.leg.br");
        simpleMailMessage.setTo("editoremenda@camara.leg.br");
        simpleMailMessage.setSubject("Contato do site");
        simpleMailMessage.setText("Nome: " + message.getNome() + "\nEmail: " +
                message.getEmail() + "\nMensagem: " + message.getMensagem() + "\n");

        mailSender.send(simpleMailMessage);
    }

}
