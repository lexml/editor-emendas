package br.gov.lexml.editoremendas;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class EmendaWebConfiguration {
	
	private static String CONTENT_SECURITY_POLICY = "default-src 'self' blob: data: *.senado.gov.br:* *.senado.leg.br:* wss://*.senado.gov.br:* wss://*.senado.leg.br:* *.congressonacional.leg.br *.lexml.gov.br *.normas.leg.br *.camara.leg.br vlibras.gov.br *.vlibras.gov.br *.googleapis.com *.bootstrapcdn.com cdnjs.cloudflare.com code.jquery.com *.fontawesome.com fonts.gstatic.com www.google-analytics.com ssl.google-analytics.com google-analytics.com analytics.google.com translate.google.com stats.g.doubleclick.net ampcid.google.com recaptcha.net www.recaptcha.net use.typekit.net www.gstatic.com www.google.com/recaptcha/ *.ytimg.com *.youtube.com grafana.com cdn.jsdelivr.net www.facebook.com connect.facebook.net cdn.datatables.net m.addthis.com s7.addthis.com;"
			+ " script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: *.senado.gov.br:* *.senado.leg.br:* *.congressonacional.leg.br *.lexml.gov.br *.normas.leg.br *.camara.leg.br vlibras.gov.br *.vlibras.gov.br graph.facebook.com www.facebook.com connect.facebook.net apis.google.com *.googleapis.com apex.oracle.com *.bootstrapcdn.com cdnjs.cloudflare.com code.jquery.com *.fontawesome.com fonts.gstatic.com www.google-analytics.com maps.google.com ssl.google-analytics.com google-analytics.com analytics.google.com translate.google.com stats.g.doubleclick.net ampcid.google.com recaptcha.net www.recaptcha.net www.gstatic.com www.google.com/recaptcha/ *.ytimg.com *.youtube.com cdn.datatables.net www.googletagmanager.com code.getmdl.io code.highcharts.com unpkg.com cdn.jsdelivr.net *.addthis.com z.moatads.com https://*.hotjar.com;"
			+ " style-src 'self' 'unsafe-inline' *.senado.gov.br:* *.senado.leg.br:* *.congressonacional.leg.br *.lexml.gov.br *.normas.leg.br *.camara.leg.br vlibras.gov.br *.vlibras.gov.br *.googleapis.com *.bootstrapcdn.com cdnjs.cloudflare.com code.jquery.com *.fontawesome.com fonts.gstatic.com www.google-analytics.com ssl.google-analytics.com google-analytics.com analytics.google.com translate.google.com stats.g.doubleclick.net ampcid.google.com recaptcha.net use.typekit.net www.recaptcha.net www.gstatic.com www.google.com/recaptcha/ *.ytimg.com *.youtube.com cdn.datatables.net code.getmdl.io cdn.quilljs.com ajax.aspnetcdn.com unpkg.com cdn.jsdelivr.net https://*.hotjar.com;"
			+ " img-src 'self' data: blob: *.senado.gov.br:* *.senado.leg.br:* *.congressonacional.leg.br *.lexml.gov.br *.normas.leg.br *.camara.leg.br vlibras.gov.br *.vlibras.gov.br *.interlegis.leg.br *.googleapis.com *.ggpht.com maps.google.com translate.google.com maps.gstatic.com *.bootstrapcdn.com cdnjs.cloudflare.com code.jquery.com *.fontawesome.com *.gravatar.com fonts.gstatic.com www.google-analytics.com ssl.google-analytics.com google-analytics.com analytics.google.com stats.g.doubleclick.net ampcid.google.com p.typekit.net recaptcha.net www.recaptcha.net www.gstatic.com www.google.com/recaptcha/ *.ytimg.com *.youtube.com cdn.datatables.net www.facebook.com web.facebook.com img.youtube.com validator.swagger.io online.swagger.io grafana.com *.tile.openstreetmap.org tiles.maps.opensearch.org maps.opensearch.org www.googletagmanager.com unpkg.com cdn.jsdelivr.net www.addthis.com https://*.hotjar.com;"
			+ " font-src 'self' data: *.senado.gov.br:* *.senado.leg.br:* *.congressonacional.leg.br *.lexml.gov.br *.normas.leg.br *.camara.leg.br vlibras.gov.br *.vlibras.gov.br *.googleapis.com fonts.gstatic.com *.fontawesome.com use.typekit.net *.bootstrapcdn.com cdnjs.cloudflare.com unpkg.com cdn.jsdelivr.net https://*.hotjar.com;"
			+ " object-src 'self' data: *.senado.gov.br:* *.senado.leg.br:*;"
			+ " frame-src 'self' data: *.senado.gov.br:* *.senado.leg.br:* *.congressonacional.leg.br *.lexml.gov.br *.normas.leg.br *.camara.leg.br vlibras.gov.br *.vlibras.gov.br *.recaptcha.net recaptcha.net https://www.google.com/recaptcha/ https://recaptcha.google.com *.youtube.com www.youtube-nocookie.com www.youtube.com accounts.google.com www.facebook.com web.facebook.com m.facebook.com *.addthis.com;"
			+ " connect-src 'self' blob: data: *.senado.gov.br:* *.senado.leg.br:* wss://*.senado.gov.br:* wss://*.senado.leg.br:* *.congressonacional.leg.br *.lexml.gov.br *.normas.leg.br *.camara.leg.br vlibras.gov.br *.vlibras.gov.br *.googleapis.com *.bootstrapcdn.com cdnjs.cloudflare.com code.jquery.com *.fontawesome.com fonts.gstatic.com www.google-analytics.com ssl.google-analytics.com google-analytics.com analytics.google.com translate.google.com stats.g.doubleclick.net ampcid.google.com recaptcha.net www.recaptcha.net use.typekit.net www.gstatic.com www.google.com/recaptcha/ *.ytimg.com *.youtube.com grafana.com cdn.jsdelivr.net www.facebook.com connect.facebook.net cdn.datatables.net m.addthis.com s7.addthis.com https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com;"
			+ " worker-src 'self' blob: *.senado.gov.br:* *.senado.leg.br:*;"
			+ " frame-ancestors 'self' *.senado.gov.br:* *.senado.leg.br:* *.congressonacional.leg.br *.lexml.gov.br *.normas.leg.br *.camara.leg.br;"
			+ " form-action 'self' *.senado.gov.br:* *.senado.leg.br:* *.congressonacional.leg.br *.lexml.gov.br *.normas.leg.br *.camara.leg.br senado.zoom.us;"
			+ " block-all-mixed-content;"
			+ " base-uri 'self' *.senado.gov.br:* *.senado.leg.br:*;"
			+ " manifest-src 'self' data: *.senado.gov.br:* *.senado.leg.br:* *.congressonacional.leg.br *.lexml.gov.br *.normas.leg.br *.camara.leg.br;"
			+ " upgrade-insecure-requests;"
			+ " report-uri https://www6ghml.senado.gov.br/csp-report-collector/collect";
	
	@Bean
	public FilterRegistrationBean filterRegistrationContentSecurityPolicy() {
		HttpFilter filter = new HttpFilter() {
			@Override
			protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
					throws IOException, ServletException {
				response.addHeader("Content-Security-Policy", CONTENT_SECURITY_POLICY);
				super.doFilter(request, response, chain);
			}
		};
	    FilterRegistrationBean registration = new FilterRegistrationBean();
	    registration.setFilter(filter);
	    registration.addUrlPatterns("/", "*.html");
	    registration.setName("Content-Security-Policy-Filter");
	    registration.setOrder(1);
	    return registration;
	}

	@Bean
	public FilterRegistrationBean filterRegistrationCacheControl() {
		HttpFilter filter = new HttpFilter() {
			@Override
			protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
					throws IOException, ServletException {
				response.addHeader("Cache-Control", "no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate");
				response.addHeader("Expires", "0");
				response.addHeader("Pragma", "no-cache");
				response.addHeader("Last-Modified", getServerTime());
				response.setCharacterEncoding("UTF-8");
				super.doFilter(request, response, chain);
			}
		};
	    FilterRegistrationBean registration = new FilterRegistrationBean();
	    registration.setFilter(filter);
	    registration.addUrlPatterns("", "*.html", "*.js", "*.map", "/api/*");
	    registration.setName("Cache-Control-Filter");
	    registration.setOrder(2);
	    return registration;
	}

	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}
	
	private String getServerTime() {
	    SimpleDateFormat dateFormat = new SimpleDateFormat(
	        "EEE, dd MMM yyyy HH:mm:ss z", Locale.US);
	    dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
	    return dateFormat.format(new Date());
	}	
	
}
